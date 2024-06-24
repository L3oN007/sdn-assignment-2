import PasswordSettingCard from "@/pages/settings/password-setting-card"
import ProfileSettingCard from "@/pages/settings/profile-setting-card"

export default function SettingsPage() {
  return (
    <div className="my-16 bg-white">
      <div className="mx-auto max-w-7xl">
        <div className="relative items-center px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold mb-8">Profile Settings</h1>
          <div className="grid md:grid-cols-2 gap-8">
            <ProfileSettingCard />
            <PasswordSettingCard />
          </div>
        </div>
      </div>
    </div>
  )
}
