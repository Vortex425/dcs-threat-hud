-- =========================================================
-- DCS TACTICAL UPLINK (HTTP Receiver & Macro Engine)
-- =========================================================

local Uplink = {}
Uplink.port = 7777
Uplink.tcp = nil
Uplink.queue = {}
Uplink.nextTime = 0

function Uplink.Start()
    package.path  = package.path..";.\\LuaSocket\\?.lua"
    package.cpath = package.cpath..";.\\LuaSocket\\?.dll"
    local socket = require("socket")
    
    Uplink.tcp = socket.tcp()
    Uplink.tcp:bind("*", Uplink.port)
    Uplink.tcp:listen(1)
    Uplink.tcp:settimeout(0)
    
    log.write("UPLINK", log.INFO, "Server started and listening on port " .. Uplink.port)
end

function Uplink.PushMacro(macro)
    log.write("UPLINK", log.INFO, "Translating Macro to Keystrokes: " .. macro)
    
    -- Command IDs: 179 = Menu (\)
    -- MenuItem1 = 966,
    -- MenuItem2 = 967,
    -- MenuItem3 = 968,
    -- MenuItem4 = 969,
    -- MenuItem5 = 970,
    -- MenuItem6 = 971,
    -- MenuItem7 = 972,
    -- MenuItem8 = 973,
    -- MenuItem9 = 974,
    -- MenuItem10 = 975,
    -- MenuItem11 = 976,
    -- MenuItem12 = 977,
    -- MenuExit = 978,

    if macro == "MISSION_ACTIVE" then
        table.insert(Uplink.queue, 179) -- 1. Menü auf (\)
        table.insert(Uplink.queue, 970)
        table.insert(Uplink.queue, 966)
        table.insert(Uplink.queue, 967)
        
    elseif macro == "MISSION_LIST" then
        table.insert(Uplink.queue, 179) 
        table.insert(Uplink.queue, 80)  
        table.insert(Uplink.queue, 72)  -- z.B. F2 für Mission List
        
    elseif macro == "MISSION_CODE" then
        table.insert(Uplink.queue, 179) 
        table.insert(Uplink.queue, 80)  
        table.insert(Uplink.queue, 73)  -- z.B. F3 für Code Dial
        
    elseif macro == "SUPPLIES_500" then
        table.insert(Uplink.queue, 179)
        table.insert(Uplink.queue, 80)  
        table.insert(Uplink.queue, 74)  -- z.B. F4 für Supplies
        table.insert(Uplink.queue, 71)  -- z.B. F1 für 500
    end
end

function Uplink.Step()
    if Uplink.tcp then
        local client = Uplink.tcp:accept()
        if client then
            -- 🔥 FIX 1: Wir geben dem WLAN 100ms Zeit, um den Text abzuliefern
            client:settimeout(0.1) 
            local request, err = client:receive()
            
            if request then
                local cmd = string.match(request, "GET /([%w_]+)")
                if cmd then
                    log.write("UPLINK", log.INFO, "Successfully received command from App: " .. cmd)
                    Uplink.PushMacro(cmd)
                end
            else
                log.write("UPLINK", log.INFO, "Connection accepted, but data empty or timeout: " .. tostring(err))
            end
            
            client:send("HTTP/1.1 200 OK\r\nContent-Length: 2\r\n\r\nOK")
            client:close()
        end
    end

    local t = LoGetModelTime()
    -- 🔥 FIX 2: Pause auf 0.4 Sekunden hochgesetzt. 
    -- WICHTIG: LoGetModelTime() läuft nur, wenn das Spiel NICHT pausiert ist!
    if t and t > Uplink.nextTime and #Uplink.queue > 0 then
        local keyToPress = table.remove(Uplink.queue, 1)
        log.write("UPLINK", log.INFO, "Pressing Key ID: " .. tostring(keyToPress))
        LoSetCommand(keyToPress)
        Uplink.nextTime = t + 0.4 
    end
end

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