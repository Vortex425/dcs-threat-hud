-- =========================================================
-- DCS TACTICAL UPLINK (HTTP Receiver & Macro Engine)
-- =========================================================

-- Eintragung in Export.lua "dofile(lfs.writedir()..[[Scripts\DCS_Uplink.lua]])"

local Uplink = {}
Uplink.port = 7777
Uplink.tcp = nil
Uplink.queue = {}
Uplink.nextTime = 0

-- Startet den unsichtbaren Server
function Uplink.Start()
    package.path  = package.path..";.\\LuaSocket\\?.lua"
    package.cpath = package.cpath..";.\\LuaSocket\\?.dll"
    local socket = require("socket")
    
    Uplink.tcp = socket.tcp()
    Uplink.tcp:bind("*", Uplink.port)
    Uplink.tcp:listen(1)
    Uplink.tcp:settimeout(0) -- Non-blocking, damit DCS nicht ruckelt
end

-- Hier definieren wir die Tasten-Kombinationen (Macros)
function Uplink.PushMacro(macro)
    -- DCS Command IDs: 
    -- 179 = Comms Menu (\)
    -- 71 bis 82 = F1 bis F12
    
    if macro == "SUPPLIES_500" then
        table.insert(Uplink.queue, 179) -- Öffne Menü
        table.insert(Uplink.queue, 80)  -- F10 (Other)
        table.insert(Uplink.queue, 72)  -- F2 (Supplies - Beispiel!)
        table.insert(Uplink.queue, 73)  -- F3 (500 - Beispiel!)
        table.insert(Uplink.queue, 82)  -- F12 (Menü schließen, optional)
        
    elseif macro == "MISSION_ACTIVE" then
        table.insert(Uplink.queue, 179)
        table.insert(Uplink.queue, 80)  -- F10
        table.insert(Uplink.queue, 71)  -- F1 (Mission Active - Beispiel!)
    end
    -- Hier kannst du später weitere "elseif" Blöcke für deine anderen Buttons einbauen!
end

-- Lauscht auf die App und tippt die Tasten
function Uplink.Step()
    -- 1. Hören, ob die App anruft
    if Uplink.tcp then
        local client = Uplink.tcp:accept()
        if client then
            client:settimeout(0)
            local request, err = client:receive()
            if request then
                -- Extrahiert den Macro-Namen aus dem HTTP Request
                local cmd = string.match(request, "GET /([%w_]+)")
                if cmd then
                    Uplink.PushMacro(cmd)
                end
            end
            -- Antwort an die App senden, damit sie weiß, dass es ankam
            client:send("HTTP/1.1 200 OK\r\nContent-Length: 2\r\n\r\nOK")
            client:close()
        end
    end

    -- 2. Tasten tippen (mit kurzer Pause dazwischen, damit das DCS Menü reagieren kann)
    local t = LoGetModelTime()
    if t > Uplink.nextTime and #Uplink.queue > 0 then
        local keyToPress = table.remove(Uplink.queue, 1)
        LoSetCommand(keyToPress)
        Uplink.nextTime = t + 0.2 -- 200 Millisekunden Pause zwischen jedem Tastendruck
    end
end

-- =========================================================
-- DCS HOOKS (Bindet das Skript in den Spielablauf ein)
-- =========================================================
local PrevLuaExportStart = LuaExportStart
LuaExportStart = function()
    if PrevLuaExportStart then PrevLuaExportStart() end
    Uplink.Start()
end

local PrevLuaExportBeforeNextFrame = LuaExportBeforeNextFrame
LuaExportBeforeNextFrame = function()
    if PrevLuaExportBeforeNextFrame then PrevLuaExportBeforeNextFrame() end
    Uplink.Step()
end