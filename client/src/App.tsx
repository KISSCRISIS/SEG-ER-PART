import { Toaster } from "@/components/ui/sonner";
import Bi from "@/components/Bi";
import { TooltipProvider } from "@/components/ui/tooltip";
import { SEG_ROUTES } from "@/lib/seg-navigation";
import ProtectedRoute from "./components/ProtectedRoute";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import { lazy, Suspense } from "react";

const DashboardPage = lazy(() => import("@/pages/DashboardPage"));
const Home = lazy(() => import("@/pages/Home"));
const NotFound = lazy(() => import("@/pages/NotFound"));
const LaboratoryPage = lazy(() => import("@/pages/LaboratoryPage"));
const LoginPage = lazy(() => import("@/pages/LoginPage"));
const RegisterPage = lazy(() => import("@/pages/RegisterPage"));
const VerifyEmailPage = lazy(() => import("@/pages/VerifyEmailPage"));
const ResidentLearnPage = lazy(() => import("@/pages/ResidentLearnPage"));
const StudyBookReaderPage = lazy(() => import("@/pages/StudyBookReaderPage"));
const ResidentPracticePage = lazy(() => import("@/pages/ResidentPracticePage"));
const QbankPortalPage = lazy(() => import("@/pages/QbankPortalPage"));
const ResidentPathwayPage = lazy(() => import("@/pages/ResidentPathwayPage"));
const AtlasPage = lazy(() => import("@/pages/AtlasPage"));
const MedicalJournalPage = lazy(() => import("@/pages/MedicalJournalPage"));
const AccountPage = lazy(() => import("@/pages/AccountPage"));
const UnifiedGuidePage = lazy(() => import("@/pages/UnifiedGuidePage"));
const RoshHighYieldSummaryPage = lazy(() => import("@/pages/RoshHighYieldSummaryPage"));
const TintinalliHighYieldSummaryPage = lazy(() => import("@/pages/TintinalliHighYieldSummaryPage"));
const RosenHighYieldSummaryPage = lazy(() => import("@/pages/RosenHighYieldSummaryPage"));
const HighYieldLibraryPage = lazy(() => import("@/pages/HighYieldLibraryPage"));
const OriginalBooksLibraryPage = lazy(() => import("@/pages/OriginalBooksLibraryPage"));
const WeaknessCenterPage = lazy(() => import("@/pages/WeaknessCenterPage"));
const PdfLibraryPage = lazy(() => import("@/pages/PdfLibraryPage"));
const RevisionToolsPage = lazy(() => import("@/pages/RevisionToolsPage"));
const ChapterReaderPage = lazy(() => import("@/pages/ChapterReaderPage"));
const MedicalSystemPage = lazy(() => import("@/pages/MedicalSystemPage"));
const ExamTrapsPage = lazy(() => import("@/pages/ExamTrapsPage"));

function ProtectedPage({ children }: { children: React.ReactNode }) {
  return (
    <ProtectedRoute
      redirectPath={`${SEG_ROUTES.login}?returnTo=${encodeURIComponent(window.location.pathname + window.location.search + window.location.hash)}`}
    >
      {children}
    </ProtectedRoute>
  );
}

function ProtectedDashboardPage() {
  return (
    <ProtectedPage>
      <DashboardPage />
    </ProtectedPage>
  );
}

function ProtectedLaboratoryPage() {
  return (
    <ProtectedPage>
      <LaboratoryPage />
    </ProtectedPage>
  );
}

function ProtectedLearnPage() {
  return (
    <ProtectedPage>
      <ResidentLearnPage />
    </ProtectedPage>
  );
}
function ProtectedStudyBookPage({ bookId }: { bookId: string }) {
  return (
    <ProtectedPage>
      <StudyBookReaderPage bookId={bookId} />
    </ProtectedPage>
  );
}
function ProtectedPracticePage() {
  return (
    <ProtectedPage>
      <ResidentPracticePage />
    </ProtectedPage>
  );
}
function ProtectedQbankPortal({
  view,
}: {
  view: "home" | "exams" | "performance" | "settings";
}) {
  return (
    <ProtectedPage>
      <QbankPortalPage view={view} />
    </ProtectedPage>
  );
}
function ProtectedPathwayPage() {
  return (
    <ProtectedPage>
      <ResidentPathwayPage />
    </ProtectedPage>
  );
}
function ProtectedAtlasPage() {
  return (
    <ProtectedPage>
      <AtlasPage />
    </ProtectedPage>
  );
}
function ProtectedJournalPage() {
  return (
    <ProtectedPage>
      <MedicalJournalPage />
    </ProtectedPage>
  );
}
function ProtectedAccountPage() {
  return (
    <ProtectedPage>
      <AccountPage />
    </ProtectedPage>
  );
}

function Router() {
  return (
    <Suspense
      fallback={
        <div
          className="seg-app grid min-h-screen place-items-center"
          role="status"
        >
          <Bi t="app.loading" />
        </div>
      }
    >
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/register" component={RegisterPage} />
        <Route path="/login" component={LoginPage} />
        <Route path={SEG_ROUTES.verifyEmail} component={VerifyEmailPage} />
        <Route path="/dashboard" component={ProtectedDashboardPage} />
        <Route
          path={SEG_ROUTES.laboratory}
          component={ProtectedLaboratoryPage}
        />
        <Route path="/learn/books/:bookId">
          {params => <ProtectedStudyBookPage bookId={params.bookId} />}
        </Route>
        <Route path="/learn/books" component={() => <ProtectedPage><OriginalBooksLibraryPage /></ProtectedPage>} />
        <Route path="/learn/pdf" component={() => <ProtectedPage><PdfLibraryPage /></ProtectedPage>} />
        <Route path="/learn/revision" component={() => <ProtectedPage><RevisionToolsPage /></ProtectedPage>} />
        <Route path="/learn/weakness" component={() => <ProtectedPage><WeaknessCenterPage /></ProtectedPage>} />
        <Route path={SEG_ROUTES.learn} component={ProtectedLearnPage} />
        <Route path="/learn/chapter/:chapterId">
          {params => <ProtectedPage><ChapterReaderPage chapterId={params.chapterId} /></ProtectedPage>}
        </Route>
        <Route path="/learn/system/:systemId">
          {params => <ProtectedPage><MedicalSystemPage systemId={params.systemId} /></ProtectedPage>}
        </Route>
        <Route path="/practice/exam-traps" component={() => <ProtectedPage><ExamTrapsPage /></ProtectedPage>} />
        <Route path="/learn/unified-guide" component={() => <ProtectedPage><UnifiedGuidePage /></ProtectedPage>} />
        <Route path="/learn/summaries/rosh-high-yield" component={() => <ProtectedPage><RoshHighYieldSummaryPage /></ProtectedPage>} />
        <Route path="/learn/summaries/tintinalli-high-yield" component={() => <ProtectedPage><TintinalliHighYieldSummaryPage /></ProtectedPage>} />
        <Route path="/learn/summaries/rosen-high-yield" component={() => <ProtectedPage><RosenHighYieldSummaryPage /></ProtectedPage>} />
        <Route path="/learn/summaries" component={() => <ProtectedPage><HighYieldLibraryPage /></ProtectedPage>} />
        <Route path="/practice/create" component={ProtectedPracticePage} />
        <Route path="/practice/exams">
          {() => <ProtectedQbankPortal view="exams" />}
        </Route>
        <Route path="/practice/performance">
          {() => <ProtectedQbankPortal view="performance" />}
        </Route>
        <Route path="/practice/settings">
          {() => <ProtectedQbankPortal view="settings" />}
        </Route>
        <Route path={SEG_ROUTES.practice}>
          {() => <ProtectedQbankPortal view="home" />}
        </Route>
        <Route path={SEG_ROUTES.pathway} component={ProtectedPathwayPage} />
        <Route path={SEG_ROUTES.atlas} component={ProtectedAtlasPage} />
        <Route path={SEG_ROUTES.journal} component={ProtectedJournalPage} />
        <Route path={SEG_ROUTES.account} component={ProtectedAccountPage} />
        <Route path="/404" component={NotFound} />
        <Route component={NotFound} />
      </Switch>
    </Suspense>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="system">
        <TooltipProvider>
          <Toaster richColors />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
