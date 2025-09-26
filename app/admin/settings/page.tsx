"use client"

import { useState } from "react"
import AdminLayout from "@/components/admin/admin-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Save, Settings, Shield, Mail, Globe } from "lucide-react"

interface SystemSettings {
  site: {
    maintenanceMode: boolean
    allowRegistration: boolean
    requireEmailVerification: boolean
    maxFileUploadSize: string
  }
  email: {
    smtpHost: string
    smtpPort: string
    smtpUsername: string
    smtpPassword: string
    fromEmail: string
    fromName: string
  }
  security: {
    sessionTimeout: string
    maxLoginAttempts: string
    passwordMinLength: string
    requireStrongPasswords: boolean
  }
  backup: {
    autoBackup: boolean
    backupFrequency: string
    retentionDays: string
  }
}

export default function SettingsPage() {
  const [settings, setSettings] = useState<SystemSettings>({
    site: {
      maintenanceMode: false,
      allowRegistration: false,
      requireEmailVerification: true,
      maxFileUploadSize: "10MB",
    },
    email: {
      smtpHost: "",
      smtpPort: "587",
      smtpUsername: "",
      smtpPassword: "",
      fromEmail: "noreply@dermayooth.com",
      fromName: "DERMAYOOTH",
    },
    security: {
      sessionTimeout: "24",
      maxLoginAttempts: "5",
      passwordMinLength: "8",
      requireStrongPasswords: true,
    },
    backup: {
      autoBackup: true,
      backupFrequency: "daily",
      retentionDays: "30",
    },
  })
  const [saving, setSaving] = useState(false)

  const handleSave = async () => {
    setSaving(true)
    try {
      // In a real implementation, you would save to your backend
      await new Promise((resolve) => setTimeout(resolve, 1000))
      alert("Settings saved successfully!")
    } catch (error) {
      console.error("Failed to save settings:", error)
      alert("Failed to save settings")
    } finally {
      setSaving(false)
    }
  }

  const updateSiteSetting = (key: keyof SystemSettings["site"], value: any) => {
    setSettings({
      ...settings,
      site: {
        ...settings.site,
        [key]: value,
      },
    })
  }

  const updateEmailSetting = (key: keyof SystemSettings["email"], value: string) => {
    setSettings({
      ...settings,
      email: {
        ...settings.email,
        [key]: value,
      },
    })
  }

  const updateSecuritySetting = (key: keyof SystemSettings["security"], value: any) => {
    setSettings({
      ...settings,
      security: {
        ...settings.security,
        [key]: value,
      },
    })
  }

  const updateBackupSetting = (key: keyof SystemSettings["backup"], value: any) => {
    setSettings({
      ...settings,
      backup: {
        ...settings.backup,
        [key]: value,
      },
    })
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold bell-mt">System Settings</h1>
            <p className="text-gray-600 bookman">Configure system-wide settings and preferences</p>
          </div>
          <Button onClick={handleSave} disabled={saving}>
            <Save className="h-4 w-4 mr-2" />
            {saving ? "Saving..." : "Save All Settings"}
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Site Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Globe className="h-5 w-5 mr-2" />
                Site Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="maintenance">Maintenance Mode</Label>
                  <p className="text-sm text-gray-500">Put the site in maintenance mode</p>
                </div>
                <Switch
                  id="maintenance"
                  checked={settings.site.maintenanceMode}
                  onCheckedChange={(checked) => updateSiteSetting("maintenanceMode", checked)}
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="registration">Allow Registration</Label>
                  <p className="text-sm text-gray-500">Allow new user registrations</p>
                </div>
                <Switch
                  id="registration"
                  checked={settings.site.allowRegistration}
                  onCheckedChange={(checked) => updateSiteSetting("allowRegistration", checked)}
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="email-verification">Email Verification</Label>
                  <p className="text-sm text-gray-500">Require email verification for new accounts</p>
                </div>
                <Switch
                  id="email-verification"
                  checked={settings.site.requireEmailVerification}
                  onCheckedChange={(checked) => updateSiteSetting("requireEmailVerification", checked)}
                />
              </div>

              <div>
                <Label htmlFor="upload-size">Max File Upload Size</Label>
                <Input
                  id="upload-size"
                  value={settings.site.maxFileUploadSize}
                  onChange={(e) => updateSiteSetting("maxFileUploadSize", e.target.value)}
                  placeholder="10MB"
                />
              </div>
            </CardContent>
          </Card>

          {/* Security Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Shield className="h-5 w-5 mr-2" />
                Security Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="session-timeout">Session Timeout (hours)</Label>
                <Input
                  id="session-timeout"
                  value={settings.security.sessionTimeout}
                  onChange={(e) => updateSecuritySetting("sessionTimeout", e.target.value)}
                  placeholder="24"
                />
              </div>

              <div>
                <Label htmlFor="max-attempts">Max Login Attempts</Label>
                <Input
                  id="max-attempts"
                  value={settings.security.maxLoginAttempts}
                  onChange={(e) => updateSecuritySetting("maxLoginAttempts", e.target.value)}
                  placeholder="5"
                />
              </div>

              <div>
                <Label htmlFor="password-length">Password Min Length</Label>
                <Input
                  id="password-length"
                  value={settings.security.passwordMinLength}
                  onChange={(e) => updateSecuritySetting("passwordMinLength", e.target.value)}
                  placeholder="8"
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="strong-passwords">Require Strong Passwords</Label>
                  <p className="text-sm text-gray-500">Require uppercase, lowercase, numbers, and symbols</p>
                </div>
                <Switch
                  id="strong-passwords"
                  checked={settings.security.requireStrongPasswords}
                  onCheckedChange={(checked) => updateSecuritySetting("requireStrongPasswords", checked)}
                />
              </div>
            </CardContent>
          </Card>

          {/* Email Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Mail className="h-5 w-5 mr-2" />
                Email Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="smtp-host">SMTP Host</Label>
                  <Input
                    id="smtp-host"
                    value={settings.email.smtpHost}
                    onChange={(e) => updateEmailSetting("smtpHost", e.target.value)}
                    placeholder="smtp.gmail.com"
                  />
                </div>
                <div>
                  <Label htmlFor="smtp-port">SMTP Port</Label>
                  <Input
                    id="smtp-port"
                    value={settings.email.smtpPort}
                    onChange={(e) => updateEmailSetting("smtpPort", e.target.value)}
                    placeholder="587"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="smtp-username">SMTP Username</Label>
                <Input
                  id="smtp-username"
                  value={settings.email.smtpUsername}
                  onChange={(e) => updateEmailSetting("smtpUsername", e.target.value)}
                  placeholder="your-email@gmail.com"
                />
              </div>

              <div>
                <Label htmlFor="smtp-password">SMTP Password</Label>
                <Input
                  id="smtp-password"
                  type="password"
                  value={settings.email.smtpPassword}
                  onChange={(e) => updateEmailSetting("smtpPassword", e.target.value)}
                  placeholder="••••••••"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="from-email">From Email</Label>
                  <Input
                    id="from-email"
                    value={settings.email.fromEmail}
                    onChange={(e) => updateEmailSetting("fromEmail", e.target.value)}
                    placeholder="noreply@dermayooth.com"
                  />
                </div>
                <div>
                  <Label htmlFor="from-name">From Name</Label>
                  <Input
                    id="from-name"
                    value={settings.email.fromName}
                    onChange={(e) => updateEmailSetting("fromName", e.target.value)}
                    placeholder="DERMAYOOTH"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Backup Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Settings className="h-5 w-5 mr-2" />
                Backup Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="auto-backup">Auto Backup</Label>
                  <p className="text-sm text-gray-500">Automatically backup database and files</p>
                </div>
                <Switch
                  id="auto-backup"
                  checked={settings.backup.autoBackup}
                  onCheckedChange={(checked) => updateBackupSetting("autoBackup", checked)}
                />
              </div>

              <div>
                <Label htmlFor="backup-frequency">Backup Frequency</Label>
                <select
                  id="backup-frequency"
                  className="w-full p-2 border rounded-md"
                  value={settings.backup.backupFrequency}
                  onChange={(e) => updateBackupSetting("backupFrequency", e.target.value)}
                >
                  <option value="hourly">Hourly</option>
                  <option value="daily">Daily</option>
                  <option value="weekly">Weekly</option>
                  <option value="monthly">Monthly</option>
                </select>
              </div>

              <div>
                <Label htmlFor="retention-days">Retention Days</Label>
                <Input
                  id="retention-days"
                  value={settings.backup.retentionDays}
                  onChange={(e) => updateBackupSetting("retentionDays", e.target.value)}
                  placeholder="30"
                />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AdminLayout>
  )
}
