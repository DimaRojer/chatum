"use client";

import { Field } from "@/components/ui/Field/Field";
import { UserIcon } from "@/components/settings/UserIcon/UserIcon";

import { useUser } from "@/context/UserContext";

export default function ProfilePage() {
    const { user, updateUser } = useUser();

    if (!user) return null;

    return (
        <>
        <UserIcon avatar={user.avatar} />
            <div className="flex flex-col gap-4 my-4">
                <Field
                    label="Full Name"
                    value={user.name}
                    onChange={(value) =>
                        updateUser({name: value})
                    }
                />
                <Field
                    label="Email Address"
                    type="email"
                    value={user.email}
                    onChange={(value) =>
                        updateUser({email: value,})
                    }
                />
                <Field
                    label="Role"
                    value={user.role}
                    onChange={(value) =>
                        updateUser({role: value,})
                    }
                />
                <Field
                    type="textarea"
                    label="Bio"
                    value={user.description}
                    onChange={(value) =>
                        updateUser({
                            description: value,
                        })
                    }
                />
            </div>
        </>
    );
}