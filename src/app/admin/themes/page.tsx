import {
  LayoutDashboard,
  Wine,
  Calendar,
  User,
  Palette,
  Sparkles,
  Zap,
  Moon,
  Sun
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import '../../../styles/admin-themes.css';

const themes = [
  {
    id: 'jaunt',
    name: "Jaunt Studio",
    description: "Clean professional design with terracotta accents - no gradients, just solid colors",
    colors: ['#C75435', '#2C2C2C', '#F5F0E8'],
    className: 'theme-jaunt',
    fonts: 'Inter (Sans-serif)',
    icon: Sparkles
  },
  {
    id: 'midnight',
    name: 'Midnight',
    description: 'Dark mode with vibrant purple accents for late-night editing',
    colors: ['#8B5CF6', '#1F2937', '#374151'],
    className: 'theme-midnight',
    fonts: 'Space Grotesk + Work Sans',
    icon: Moon
  },
  {
    id: 'brutalist',
    name: 'Brutalist',
    description: 'Bold, high-contrast design with hard shadows and geometric shapes',
    colors: ['#000000', '#FFFF00', '#FF006E'],
    className: 'theme-brutalist',
    fonts: 'Bebas Neue + Space Grotesk',
    icon: Zap
  },
  {
    id: 'sunset',
    name: 'Sunset',
    description: 'Warm oranges and soft pinks - energetic and inviting',
    colors: ['#EA580C', '#FFF7ED', '#FFEDD5'],
    className: 'theme-sunset',
    fonts: 'Outfit + Inter',
    icon: Sun
  },
  {
    id: 'forest',
    name: 'Forest',
    description: 'Earthy greens and natural tones - calm and grounded',
    colors: ['#10B981', '#064E3B', '#D1FAE5'],
    className: 'theme-forest',
    fonts: 'Crimson Pro (Serif) + Work Sans',
    icon: LayoutDashboard
  },
  {
    id: 'ocean',
    name: 'Ocean',
    description: 'Deep blues and refreshing teals - serene and professional',
    colors: ['#06B6D4', '#164E63', '#CFFAFE'],
    className: 'theme-ocean',
    fonts: 'Sora + Inter',
    icon: LayoutDashboard
  },
  {
    id: 'lavender',
    name: 'Lavender Dreams',
    description: 'Soft purples with elegant serif typography - refined and sophisticated',
    colors: ['#9333EA', '#FAF5FF', '#F3E8FF'],
    className: 'theme-lavender',
    fonts: 'Playfair Display (Serif) + Raleway',
    icon: Sparkles
  },
  {
    id: 'cyber',
    name: 'Neon Cyber',
    description: 'Futuristic dark theme with glowing cyan accents and neon effects',
    colors: ['#00FFF0', '#0A0E27', '#FF006E'],
    className: 'theme-cyber',
    fonts: 'Sora + Space Grotesk',
    icon: Zap
  },
  {
    id: 'retro',
    name: 'Retro Diner',
    description: 'Vintage 50s inspired with bold red, cream, and sky blue - fun and nostalgic',
    colors: ['#DC2626', '#FFE5B4', '#DBEAFE'],
    className: 'theme-retro',
    fonts: 'Bebas Neue + Outfit',
    icon: Sparkles
  },
  {
    id: 'sage',
    name: 'Sage Garden',
    description: 'Muted greens with warm neutrals - natural and calming',
    colors: ['#84A98C', '#F8F4ED', '#E8DED2'],
    className: 'theme-sage',
    fonts: 'DM Serif Display + Work Sans',
    icon: LayoutDashboard
  },
];

export default function ThemePreviewPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Link href="/admin">
            <Button variant="outline" className="mb-4">
              ← Back to Admin
            </Button>
          </Link>
          <div className="flex items-center gap-3 mb-2">
            <Palette className="h-8 w-8 text-purple-600" />
            <h1 className="text-4xl font-bold text-gray-900">Admin Theme Gallery</h1>
          </div>
          <p className="text-lg text-gray-600 mb-2">
            Preview 10 completely different visual styles for your admin panel. Each theme features unique colors, fonts, and button effects.
          </p>
          <p className="text-sm text-gray-500">
            <strong>All functionality remains identical</strong> - only the visual design changes.
          </p>
        </div>

        {/* Theme Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {themes.map((theme) => {
            const Icon = theme.icon;
            return (
              <Card key={theme.id} className="overflow-hidden shadow-xl border-2 hover:shadow-2xl transition-all">
                <CardHeader className="bg-gradient-to-r from-gray-50 to-white border-b">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-2xl font-bold flex items-center gap-2">
                        <Icon className="h-6 w-6" />
                        {theme.name}
                        {theme.id === 'jaunt' && (
                          <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full font-normal">
                            Recommended
                          </span>
                        )}
                      </CardTitle>
                      <CardDescription className="mt-1 text-base">
                        {theme.description}
                      </CardDescription>
                      <div className="mt-2 flex items-center gap-2 text-sm text-gray-600">
                        <span className="font-medium">Fonts:</span>
                        <span className="text-gray-500">{theme.fonts}</span>
                      </div>
                    </div>
                    <div className="flex gap-2 ml-4">
                      {theme.colors.map((color, idx) => (
                        <div
                          key={idx}
                          className="w-8 h-8 rounded-full border-2 border-white shadow-md flex-shrink-0"
                          style={{ backgroundColor: color }}
                        />
                      ))}
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-0">
                  {/* Theme Preview */}
                  <div className={`${theme.className} admin-themed p-6 min-h-[450px]`}>
                    {/* Mini Header */}
                    <div className="admin-header rounded-lg p-4 mb-4">
                      <div className="flex items-center justify-between">
                        <h2 className="text-xl font-bold text-white">Admin Panel</h2>
                        <div className="flex gap-2">
                          <div className="w-8 h-8 rounded bg-white/20" />
                          <div className="w-8 h-8 rounded bg-white/20" />
                        </div>
                      </div>
                    </div>

                    {/* Mini Welcome Card */}
                    <div className="admin-card admin-card-lg rounded-lg p-4 mb-4">
                      <div className="flex items-start gap-3">
                        <div className="admin-button-primary p-2 rounded-lg">
                          <LayoutDashboard className="h-5 w-5" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-bold text-lg mb-1">Welcome Back</h3>
                          <p className="admin-text-muted text-sm">
                            Manage your website content here. Changes save automatically.
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Mini Tabs */}
                    <div className="grid grid-cols-3 gap-2 mb-4">
                      <button className="admin-tab-button active p-3 rounded-lg flex items-center justify-center gap-2 font-medium">
                        <LayoutDashboard className="h-4 w-4" />
                        <span className="text-sm">Layout</span>
                      </button>
                      <button className="admin-tab-button p-3 rounded-lg flex items-center justify-center gap-2 font-medium">
                        <Wine className="h-4 w-4" />
                        <span className="text-sm">Wines</span>
                      </button>
                      <button className="admin-tab-button p-3 rounded-lg flex items-center justify-center gap-2 font-medium">
                        <Calendar className="h-4 w-4" />
                        <span className="text-sm">Events</span>
                      </button>
                    </div>

                    {/* Mini Content Card */}
                    <div className="admin-card rounded-lg p-4">
                      <div className="flex items-start gap-3 mb-3">
                        <User className="h-5 w-5 admin-text-muted" />
                        <div className="flex-1">
                          <h4 className="font-semibold mb-2">Section Settings</h4>
                          <div className="space-y-2">
                            <div className="h-8 admin-accent rounded" />
                            <div className="h-8 admin-accent rounded" />
                            <div className="h-8 admin-accent rounded w-2/3" />
                          </div>
                        </div>
                      </div>
                      <button className="admin-button-primary w-full py-2 rounded-lg font-medium mt-3">
                        Save Changes
                      </button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Theme Highlights */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="border-purple-200 bg-purple-50">
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                <Sparkles className="h-5 w-5 text-purple-600 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-purple-900 mb-1">Unique Fonts</h4>
                  <p className="text-sm text-purple-700">
                    Each theme uses carefully paired font combinations from Google Fonts
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-blue-200 bg-blue-50">
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                <Zap className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-blue-900 mb-1">Special Effects</h4>
                  <p className="text-sm text-blue-700">
                    Brutalist hard shadows, Cyber neon glows, Retro vintage vibes
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-green-200 bg-green-50">
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                <Palette className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-green-900 mb-1">Full Customization</h4>
                  <p className="text-sm text-green-700">
                    Colors, shadows, borders, and button shapes all unique per theme
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Implementation Note */}
        <Card className="mt-8 border-2 border-indigo-200 bg-gradient-to-br from-indigo-50 to-purple-50">
          <CardContent className="p-6">
            <div className="flex items-start gap-4">
              <div className="bg-gradient-to-br from-indigo-500 to-purple-500 p-3 rounded-xl shadow-lg">
                <Palette className="h-6 w-6 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-2xl text-indigo-900 mb-3">Choose Your Style</h3>
                <p className="text-indigo-800 mb-4 text-lg">
                  All 10 themes are fully implemented and ready to use. Each maintains identical functionality while offering a completely unique visual experience.
                </p>

                <div className="bg-white rounded-lg p-4 mb-4">
                  <h4 className="font-semibold text-indigo-900 mb-2">What&apos;s Different:</h4>
                  <ul className="grid grid-cols-2 gap-2 text-sm text-indigo-700">
                    <li className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full" />
                      Color schemes
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full" />
                      Font combinations
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full" />
                      Button shapes & effects
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full" />
                      Shadow styles
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full" />
                      Border treatments
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full" />
                      Hover animations
                    </li>
                  </ul>
                </div>

                <div className="bg-indigo-100 rounded-lg p-4">
                  <h4 className="font-semibold text-indigo-900 mb-2">Next Steps:</h4>
                  <ol className="list-decimal list-inside space-y-1 text-indigo-800">
                    <li>Pick your favorite theme(s) from above</li>
                    <li>Let me know which one you prefer</li>
                    <li>I&apos;ll integrate a theme switcher into your admin panel</li>
                    <li>Or set one as the permanent default</li>
                  </ol>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
