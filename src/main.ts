/// <reference types="@workadventure/iframe-api-typings" />

import { bootstrapExtra } from "@workadventure/scripting-api-extra";

console.info("Script started successfully");

let welcomePopup: any = undefined;

WA.onInit()
    .then(() => {
        console.info("Scripting API ready");
        console.info("Player tags: ", WA.player.tags);

        WA.room.onEnterLayer("info_start").subscribe(() => {
            welcomePopup = WA.ui.openPopup(
                "welcome_popup",
                `👋 Willkommen!

Pixelschubser und Wissensarchitekten:
Sichere Gestaltung von Lernumgebungen im digitalen Zeitalter

Herzlich willkommen im virtuellen Lernraum des Moduls „Digitales Lehren und Lernen“.

In dieser Sitzung lernen Sie WorkAdventure als digitale Lernumgebung kennen und setzen sich mit der Frage auseinander, wie solche Räume lernförderlich, datenschutzsensibel und souverän gestaltet werden können.

Ihre Aufgaben:

1. Raum erkunden und WorkAdventure kennenlernen
2. Gruppenaufgabe zu Datenschutz und DSGVO bearbeiten
3. Ergebnisse und Reflexionen am Whiteboard sichern
4. Impuls Görlach zu Mediengestaltung und digitaler Souveränität diskutieren

Viel Erfolg beim Erkunden des Raumes!`,
                [
                    {
                        label: "Schließen",
                        className: "primary",
                        callback: () => {
                            welcomePopup?.close();
                        },
                    },
                ]
            );
        });

        WA.room.onLeaveLayer("info_start").subscribe(() => {
            welcomePopup?.close();
        });

        bootstrapExtra()
            .then(() => {
                console.info("Scripting API Extra ready");
            })
            .catch((e) => console.error(e));
    })
    .catch((e) => console.error(e));

export {};