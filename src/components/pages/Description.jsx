
import {
  CheckCircle,
  Code2,
  Database,
  RefreshCw,
  LayoutDashboard,
  AlertTriangle,
  Info,
  Cog,
  FileText,
  BarChart,
  Brain,
  Bell,
  ChartLine,
  FileLock,
  UserRoundCheck,
  UploadCloud,
  DownloadCloud,
  ShieldAlert,
  Users,
  MonitorSmartphone,
  Mail,
  Eye,
} from "lucide-react";

const Description = () => {
  return (
    <><div className="max-w-5xl mx-auto px-6 py-10 space-y-10 text-gray-800 dark:text-gray-200 relative top-16">
      <header className="text-center space-y-2">
        <h1 className="text-4xl font-bold flex justify-center items-center gap-2">
          Project Description
        </h1>
        <p className="text-lg text-gray-500 dark:text-gray-400">
          A comprehensive breakdown of the Subscription Manager Web App
        </p>
      </header>

      {/* Overview */}
      <section>
        <h2 className="text-2xl font-semibold mb-3 flex items-center gap-2">
          <LayoutDashboard className="text-emerald-600" /> Project Overview
        </h2>
        <p className="text-gray-700 dark:text-gray-300">
          The Subscription Manager is a productivity-focused web application that helps users track, manage, and
          visualize their recurring subscriptions. Whether it's Netflix, Spotify, AWS, or gym memberships, users can
          easily add them, view trends through analytics, receive reminders before payments, and organize everything
          using a built-in mindmap view. The platform emphasizes simplicity, visual clarity, and offline-first use via
          localStorage.
        </p>
      </section>

      {/* Dynamic vs Static */}
      <section>
        <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
          <RefreshCw className="text-emerald-500" /> Dynamic vs Static Features
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          {/* Dynamic */}
          <div>
            <h3 className="text-xl font-medium mb-2 flex items-center gap-2 text-emerald-600">
              <BarChart /> Dynamic
            </h3>
            <ul className="list-disc list-inside space-y-1">
              <li><CheckCircle size={16} className="inline mr-1" /> Add, edit, delete subscriptions</li>
              <li><ChartLine size={16} className="inline mr-1" /> Realtime dashboard updates</li>
              <li><Bell size={16} className="inline mr-1" /> Subscription reminders</li>
              <li><BarChart size={16} className="inline mr-1" /> Interactive analytics</li>
              {/* <li><Brain size={16} className="inline mr-1" /> Visual mindmap view</li> */}
            </ul>
          </div>

          {/* Static */}
          <div>
            <h3 className="text-xl font-medium mb-2 flex items-center gap-2 text-blue-600">
              <FileText /> Static
            </h3>
            <ul className="list-disc list-inside space-y-1">
              <li><Cog size={16} className="inline mr-1" /> Settings page</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Technologies */}
      <section>
        <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
          <Code2 className="text-purple-500" /> Technologies Used
        </h2>
        <ul className="flex flex-wrap gap-3">
          {[
            "React",
            "Tailwind CSS",
            "Recharts",
            "React Router",
            "Context API",
            "localStorage",
            "Lucide Icons",
          ].map((tech) => (
            <li
              key={tech}
              className="px-3 py-1 bg-gray-200 dark:bg-slate-700 rounded-full text-sm"
            >
              {tech}
            </li>
          ))}
        </ul>
      </section>

      {/* Logic & Context */}
      <section>
        <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
          <Database className="text-indigo-600" /> Logic Flow & Context
        </h2>
        <ul className="list-disc list-inside space-y-2">
          <li>
            <strong>SubscriptionContext:</strong> Centralized context managing subscription data with
            `localStorage` persistence. All add/edit/delete operations reflect immediately in UI.
          </li>
          <li>
            <strong>Routing:</strong> Uses <code>react-router-dom</code> for navigation between pages
            like Dashboard, Analytics, Reminders, and Settings. Each route conditionally renders based
            on the URL path.
          </li>
          <li>
            <strong>Subscription Form State:</strong> Controlled locally via component state; toggled using
            global navigation or page-specific triggers.
          </li>
          <li>
            <strong>Chart Logic:</strong> Chart data is generated using <code>useMemo()</code> and
            transformed on-the-fly based on filters or subscription changes.
          </li>
          <li>
            <strong>Reminder Logic:</strong> Uses date comparisons (start date + cycle) to determine
            upcoming payments and displays them with notification-like styling.
          </li>
          <li>
            <strong>Analytics & Visualizations:</strong> Handled using Recharts, with support for line,
            bar, and pie charts, responsive behavior, and category grouping.
          </li>
        </ul>
      </section>

      {/* Scalability */}
      <section>
        <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
          <UploadCloud className="text-green-500" /> Scalability & Extensibility
        </h2>
        <ul className="list-disc list-inside space-y-1">
          <li><MonitorSmartphone size={16} className="inline mr-1" /> Add backend for real-time sync (Firebase, Supabase, etc.)</li>
          <li><Users size={16} className="inline mr-1" /> Multi-user support with authentication</li>
          <li><DownloadCloud size={16} className="inline mr-1" /> Import subscriptions from CSV/SMS parsing</li>
          <li><Mail size={16} className="inline mr-1" /> Shareable PDF or email reports</li>
        </ul>
      </section>

      {/* Limitations */}
      <section>
        <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2 text-yellow-600">
          <AlertTriangle /> Known Limitations
        </h2>
        <ul className="list-disc list-inside space-y-1">
          <li><ShieldAlert size={16} className="inline mr-1" /> Data is stored only in the browser (no cloud backup)</li>
          <li><RefreshCw size={16} className="inline mr-1" /> No real-time bank syncing</li>
          <li><Eye size={16} className="inline mr-1" /> Notifications require open browser sessions</li>
        </ul>
      </section>
    </div><footer className="pt-10 text-center text-sm bg-none text-gray-400 mt-7 flex justify-center items-center">
        &copy; {new Date().getFullYear()} Subscription Manager. Built with ❤️ using React.
      </footer></>
  );
};

export default Description;
