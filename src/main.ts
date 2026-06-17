/// <reference types="@workadventure/iframe-api-typings" />

import { bootstrapExtra } from "@workadventure/scripting-api-extra";

console.info("Script started successfully");

let welcomePopup: any = undefined;
let aufgabenAction: any = undefined;

WA.onInit()
    .then(() => {
        console.info("Scripting API ready");
        console.info("Player tags: ", WA.player.tags);

        WA.room.onEnterLayer("info_start").subscribe(() => {
            welcomePopup = WA.ui.openPopup(
                "welcome_popup",
                `👋 Herzlich Willkommen, liebe Pixelschubser & Wissensarchitekten!

                Im virtuellen Lernraum des Moduls "Digitales Lehren und Lernen" erwartet Sie heute eine spannende Reise durch die Welt der digitalen Lernumgebungen 💻.

                Gemeinsam werden wir erkunden 🔎, wie wir solche Räume gestalten 🎨 können, damit sie nicht nur lernförderlich 🧠, sondern auch datenschutzsensibel 🔐 sind.

                Ihre Aufgaben 📝 erhalten Sie am Tisch 🪑 nebenan.

                Viel Erfolg 🍀 und vor allem viel Spaß 😄 beim Erkunden des Raumes 🚀!`,
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

        WA.room.area.onEnter("aufgaben").subscribe(() => {
            aufgabenAction = WA.ui.displayActionMessage({
                message: "Leertaste drücken, um die Aufgaben zu öffnen",
                callback: () => {
                    WA.nav.openCoWebSite("./aufgaben.html");
                },
            });
        });

        WA.room.area.onLeave("aufgaben").subscribe(() => {
            aufgabenAction?.remove();
        });

        bootstrapExtra()
            .then(() => {
                console.info("Scripting API Extra ready");
            })
            .catch((e) => console.error(e));
    })
    .catch((e) => console.error(e));

export {};