"use client";

import { Field } from "@/components/ui/Field/Field";

import { useUser } from "@/context/UserContext";

export default function LanguagePage() {
    const { user, updateUser } = useUser();
    if (!user) {
        return null;
    }
    return (
        <div className="flex flex-col gap-4 my-4">
            <Field
                id="language"
                name="language"
                label="Язык интерфейса"
                type="select"
                value={user.settings.language.language}
                onChange={(value) =>
                    updateUser({
                        settings: {
                            ...user.settings,
                            language: {
                                ...user.settings.language,
                                language: value,
                            },
                        },
                    })
                }
                options={[
                    {
                        value: "ru",
                        label: "Русский",
                    },
                    {
                        value: "en",
                        label: "English",
                    },
                ]}
            />

            <Field
                id="date-format"
                name="date-format"
                label="Формат даты"
                type="select"
                value={user.settings.language.dateFormat}
                onChange={(value) =>
                    updateUser({
                        settings: {
                            ...user.settings,
                            language: {
                                ...user.settings.language,
                                dateFormat: value,
                            },
                        },
                    })
                }
                options={[
                    {
                        value: "31.12.2000",
                        label: "ДД.ММ.ГГГГ",
                    },
                    {
                        value: "12/31/2000",
                        label: "ММ/ДД/ГГГГ",
                    },
                    {
                        value: "2000-12-31",
                        label: "ГГГГ-ММ-ДД",
                    },
                ]}
            />

            <Field
                id="time-format"
                name="time-format"
                label="Формат времени"
                type="select"
                value={user.settings.language.timeFormat}
                onChange={(value) =>
                    updateUser({
                        settings: {
                            ...user.settings,
                            language: {
                                ...user.settings.language,
                                timeFormat: value,
                            },
                        },
                    })
                }
                options={[
                    {
                        value: "14:30",
                        label: "24-часовой",
                    },
                    {
                        value: "2:30 PM",
                        label: "12-часовой",
                    },
                ]}
            />
        </div>
    );
}