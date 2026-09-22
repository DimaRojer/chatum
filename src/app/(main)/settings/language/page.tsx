"use client";

import { Field } from "@/components/ui/Field/Field";

import { useUser } from "@/context/UserContext";

export default function LanguagePage() {
    const { user, updateUser } = useUser();

    return (
        <div className="flex flex-col gap-4 my-4">
            <Field
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