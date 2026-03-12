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

    -- ================= LOGISTICS =================
    if macro == "LOGISTICS_CRATES" then
        -- # > F10 > F3 > F1 > F1
        local seq = {179, 975, 968, 966, 966}
        for _, v in ipairs(seq) do table.insert(Uplink.queue, v) end
        
    elseif macro == "LOGISTICS_CRATE_2000" then
        -- # > F10 > F3 > F1 > F1 > F3
        local seq = {179, 975, 968, 966, 966, 968}
        for _, v in ipairs(seq) do table.insert(Uplink.queue, v) end

    elseif macro == "LOGISTICS_UNPACK_ALL" then
        -- # > F10 > F3 > F1 > F5
        local seq = {179, 975, 968, 966, 970}
        for _, v in ipairs(seq) do table.insert(Uplink.queue, v) end

    elseif macro == "LOGISTICS_INFANTRY" then
        -- # > F10 > F3 > F2 > F1
        local seq = {179, 975, 968, 967, 966}
        for _, v in ipairs(seq) do table.insert(Uplink.queue, v) end

    -- ================= CSAR =================
    elseif macro == "CSAR_MAIN" then
        -- # > F10 > F3 > F3
        local seq = {179, 975, 968, 968}
        for _, v in ipairs(seq) do table.insert(Uplink.queue, v) end

    elseif macro == "CSAR_INFO" then
        -- # > F10 > F3 > F3 > F1
        local seq = {179, 975, 968, 968, 966}
        for _, v in ipairs(seq) do table.insert(Uplink.queue, v) end

    elseif macro == "CSAR_SMOKE" then
        -- # > F10 > F3 > F3 > F2
        local seq = {179, 975, 968, 968, 967}
        for _, v in ipairs(seq) do table.insert(Uplink.queue, v) end

    elseif macro == "CSAR_EXTRACT" then
        -- # > F10 > F3 > F3 > F4
        local seq = {179, 975, 968, 968, 969}
        for _, v in ipairs(seq) do table.insert(Uplink.queue, v) end

    -- ================= MISSIONS =================
    elseif macro == "MISSION_LIST" then
        -- # > F10 > F2 > F1
        local seq = {179, 975, 967, 966}
        for _, v in ipairs(seq) do table.insert(Uplink.queue, v) end

    elseif macro == "MISSION_STRIKE" then
        -- # > F10 > F2 > F1 > F8
        local seq = {179, 975, 967, 966, 973}
        for _, v in ipairs(seq) do table.insert(Uplink.queue, v) end

    elseif macro == "MISSION_CAS" then
        -- # > F10 > F2 > F1 > F3
        local seq = {179, 975, 967, 966, 968}
        for _, v in ipairs(seq) do table.insert(Uplink.queue, v) end

    elseif macro == "MISSION_SEAD" then
        -- # > F10 > F2 > F1 > F7
        local seq = {179, 975, 967, 966, 972}
        for _, v in ipairs(seq) do table.insert(Uplink.queue, v) end

    elseif macro == "MISSION_DIAL_CODE" then
        -- # > F10 > F2 > F3
        local seq = {179, 975, 967, 968}
        for _, v in ipairs(seq) do table.insert(Uplink.queue, v) end

    elseif macro == "RECON_MAIN" then
        -- # > F10 > F7 > F1
        local seq = {179, 975, 972, 966}
        for _, v in ipairs(seq) do table.insert(Uplink.queue, v) end
    end
end

function Uplink.Step()
    if Uplink.tcp then
        local client = Uplink.tcp:accept()
        if client then
            client:settimeout(0.1) 
            local request, err = client:receive()
            if request then
                local cmd = string.match(request, "GET /([%w_]+)")
                if cmd then Uplink.PushMacro(cmd) end
            end
            client:send("HTTP/1.1 200 OK\r\nContent-Length: 2\r\n\r\nOK")
            client:close()
        end
    end

    local t = LoGetModelTime()
    if t and t > Uplink.nextTime and #Uplink.queue > 0 then
        local keyToPress = table.remove(Uplink.queue, 1)
        LoSetCommand(keyToPress)
        
        -- 🔥 Die Pause wurde auf 0.25 Sekunden verkürzt für schnellere Ausführung
        Uplink.nextTime = t + 0.25 
    end
ends

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