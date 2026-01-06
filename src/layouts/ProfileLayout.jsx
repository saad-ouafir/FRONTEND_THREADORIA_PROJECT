import { Outlet } from "react-router-dom"

export default function ProfileLayout({ user }) {
    return (
        <div>
            <UserProfileData userData={user} />
            <UserProfileNavbar />
            <Outlet userData={user} />
        </div>
    )
}