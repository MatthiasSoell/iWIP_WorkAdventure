/// <reference types="@workadventure/iframe-api-typings" />

import { bootstrapExtra } from "@workadventure/scripting-api-extra";

console.info("Script started successfully");

// Waiting for the API to be ready
WA.onInit()
    .then(() => {
        console.info("Scripting API ready");
        console.info("Player tags: ", WA.player.tags);

        WA.chat.sendChatMessage("DEBUG: main.ts wurde geladen", "System");

        WA.room.onEnterLayer("info_start").subscribe(() => {
            WA.chat.sendChatMessage("DEBUG: info_start betreten", "System");

            WA.ui.openPopup(
                "welcome_popup",
                "Test: Popup funktioniert.",
                [
                    {
                        label: "Schließen",
                        className: "primary",
                        callback: (popup: any) => popup.close(),
                    },
                ]
            );
        });

        bootstrapExtra()
            .then(() => {
                console.info("Scripting API Extra ready");
            })
            .catch((e) => console.error(e));
    })
    .catch((e) => console.error(e));

export {};