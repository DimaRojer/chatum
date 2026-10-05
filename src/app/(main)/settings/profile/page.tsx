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
                    id="full-name"
                    name="full-name"
                    label="Full Name"
                    value={user.name}
                    onChange={(value) =>
                        updateUser({name: value})
                    }
                />
                <Field
                    id="email"
                    name="email"
                    label="Email Address"
                    type="email"
                    value={user.email}
                    onChange={(value) =>
                        updateUser({email: value,})
                    }
                />
                <Field
                    id="role"
                    name="role"
                    label="Role"
                    value={user.role}
                    onChange={(value) =>
                        updateUser({role: value,})
                    }
                />
                <Field
                    id="bio"
                    name="bio"
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