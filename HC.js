// ==========================
// Hardcore Utility Menu Mod
// Open/Close Menu: L
// ==========================

var Keyboard = Java.type("org.lwjgl.input.Keyboard");

var menuOpen = false;
var firstJoin = true;

var flyEnabled = false;
var godMode = false;

// ==========================
// Spawn Message
// ==========================

mod.on("update", function () {

    if (mc.thePlayer && firstJoin) {
        firstJoin = false;

        mc.thePlayer.addChatMessage(
            ChatComponentText("§aPress §eL §ato open the Hardcore Menu")
        );
    }

    // Fly
    if (flyEnabled) {
        mc.thePlayer.capabilities.allowFlying = true;
        mc.thePlayer.capabilities.isFlying = true;
    } else {
        mc.thePlayer.capabilities.isFlying = false;
        mc.thePlayer.capabilities.allowFlying = false;
    }

    // God Mode
    if (godMode) {
        mc.thePlayer.setHealth(20);
        mc.thePlayer.hurtResistantTime = 9999;
    }
});

// ==========================
// Keybind
// ==========================

mod.on("key", function(key) {

    if (key == Keyboard.KEY_L) {

        if (!menuOpen) {
            mc.displayGuiScreen(new HardcoreMenu());
            menuOpen = true;
        } else {
            mc.displayGuiScreen(null);
            menuOpen = false;
        }
    }
});

// ==========================
// GUI
// ==========================

function HardcoreMenu() {

    this.drawScreen = function(mouseX, mouseY, partialTicks) {

        // Background
        drawRect(40, 40, 260, 220, 0xAA000000);

        // Title
        mc.fontRendererObj.drawString(
            "Hardcore Utility Menu",
            85,
            50,
            0x00FFFF
        );

        // Buttons/Text
        mc.fontRendererObj.drawString("[1] 999 XP", 60, 90, 0x00FF00);
        mc.fontRendererObj.drawString("[2] Fly", 60, 110, 0x00FF00);
        mc.fontRendererObj.drawString("[3] All Items", 60, 130, 0x00FF00);
        mc.fontRendererObj.drawString("[4] Kill Player", 60, 150, 0xFF5555);
        mc.fontRendererObj.drawString("[5] God Mode", 60, 170, 0xFFFF00);

        mc.fontRendererObj.drawString(
            "Press L to close",
            85,
            205,
            0xFFFFFF
        );
    };

    this.keyTyped = function(char, key) {

        // 1 = 999 XP
        if (key == Keyboard.KEY_1) {
            mc.thePlayer.experienceLevel = 999;

            mc.thePlayer.addChatMessage(
                ChatComponentText("§aXP set to 999")
            );
        }

        // 2 = Fly Toggle
        if (key == Keyboard.KEY_2) {

            flyEnabled = !flyEnabled;

            mc.thePlayer.addChatMessage(
                ChatComponentText(
                    flyEnabled
                    ? "§aFly Enabled"
                    : "§cFly Disabled"
                )
            );
        }

        // 3 = Give Items
        if (key == Keyboard.KEY_3) {

            mc.thePlayer.inventory.addItemStackToInventory(
                new ItemStack(Item.diamond_sword)
            );

            mc.thePlayer.inventory.addItemStackToInventory(
                new ItemStack(Item.golden_apple, 64)
            );

            mc.thePlayer.inventory.addItemStackToInventory(
                new ItemStack(Item.diamond, 64)
            );

            mc.thePlayer.addChatMessage(
                ChatComponentText("§bItems Added")
            );
        }

        // 4 = Kill Player
        if (key == Keyboard.KEY_4) {

            mc.thePlayer.setHealth(0);

            mc.thePlayer.addChatMessage(
                ChatComponentText("§cPlayer Killed")
            );
        }

        // 5 = God Mode
        if (key == Keyboard.KEY_5) {

            godMode = !godMode;

            mc.thePlayer.addChatMessage(
                ChatComponentText(
                    godMode
                    ? "§eGod Mode Enabled"
                    : "§cGod Mode Disabled"
                )
            );
        }

        // L closes menu
        if (key == Keyboard.KEY_L) {
            mc.displayGuiScreen(null);
            menuOpen = false;
        }
    };

    this.doesGuiPauseGame = function() {
        return false;
    };
}
