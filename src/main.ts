/// <reference types="@workadventure/iframe-api-typings" />

import { bootstrapExtra } from "@workadventure/scripting-api-extra";

console.info("Script started successfully");

let currentPopup: any = undefined;
let welcomePopup: any = undefined;

// Waiting for the API to be ready
WA.onInit()
    .then(() => {
        console.info("Scripting API ready");
        console.info("Player tags: ", WA.player.tags);

        // Beispiel aus dem Starter Kit
        WA.room.area.onEnter("clock").subscribe(() => {
            const today = new Date();
            const time = today.getHours() + ":" + today.getMinutes();

            currentPopup = WA.ui.openPopup(
                "clockPopup",
                "It's " + time,
                []
            );
        });

        WA.room.area.onLeave("clock").subscribe(closePopup);

        // ==========================================
        // iWIP Begrüßung
        // ==========================================

        WA.room.area.onEnter("info_start").subscribe(() => {
            if (welcomePopup !== undefined) {
                return;
            }

            welcomePopup = WA.ui.openPopup(
                "welcome_popup",
                `👋 Herzlich willkommen im iWIP WorkAdventure!

Wir verbringen unsere heutige Lehrveranstaltung nicht in Zoom, sondern in einer virtuellen Lernumgebung auf Basis von WorkAdventure.

🕹️ Kurzanleitung

• Bewegen Sie Ihren Avatar mit den Pfeiltasten.
• Wenn Sie sich anderen Personen nähern, können Sie miteinander sprechen.
• Je näher Sie beieinander stehen, desto besser können Sie sich hören.
• Nutzen Sie die verschiedenen Bereiche des Raumes für Austausch und Zusammenarbeit.
• Interaktive Elemente erkennen Sie an Symbolen oder Markierungen.

💡 Tipp

Nehmen Sie sich zunächst etwas Zeit, den Raum zu erkunden und die verschiedenen Funktionen auszuprobieren.

Viel Spaß beim Entdecken!`,
                [
                    {
                        label: "Schließen",
                        className: "primary",
                        callback: (popup: any) => {
                            popup.close();
                            welcomePopup = undefined;
                        },
                    },
                ]
            );
        });

        WA.room.area.onLeave("info_start").subscribe(() => {
            if (welcomePopup !== undefined) {
                welcomePopup.close();
                welcomePopup = undefined;
            }
        });

        bootstrapExtra()
            .then(() => {
                console.info("Scripting API Extra ready");
            })
            .catch((e) => console.error(e));
    })
    .catch((e) => console.error(e));

function closePopup() {
    if (currentPopup !== undefined) {
        currentPopup.close();
        currentPopup = undefined;
    }
}

export {};
