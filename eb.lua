
local pvar

local function main()
    pvar=memory.readdword(0x7eb608)
    gui.text(0,2,"Our damage: " .. pvar)
    pvar=memory.readdword(0x7eb60c)
    gui.text(0,12,"Enemy damage: " .. pvar)
    pvar=memory.readword(0x7eb600)
    gui.text(0,22,"Doors: " .. pvar)
    pvar=memory.readword(0x7eb610)
    gui.text(0,32,"NPHs: " .. pvar)
end

emu.registerbefore(main)
