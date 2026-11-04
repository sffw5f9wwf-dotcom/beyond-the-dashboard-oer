import React, { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import { createRoot } from "react-dom/client";
import {
  Activity, ArrowDown, ArrowRight, BarChart3, BookOpen, CheckCircle2,
  ChevronRight, Database, Eye, Lightbulb, Menu, RotateCcw, ShieldCheck,
  Smartphone, Sparkles, X
} from "lucide-react";
import "./styles.css";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
const supabase = supabaseUrl && supabaseAnonKey ? createClient(supabaseUrl, supabaseAnonKey) : null;

const sections = [
  { id: "start", label: "Start here", icon: Sparkles },
  { id: "explore", label: "Explore Big Data", icon: Database },
  { id: "lifecycle", label: "Follow the data", icon: Activity },
  { id: "dashboard", label: "Investigate the dashboard", icon: BarChart3 },
  { id: "decision", label: "Make a decision", icon: Lightbulb },
  { id: "responsible", label: "Challenge the data", icon: ShieldCheck },
  { id: "apply", label: "Apply your learning", icon: BookOpen },
];

function Header({ active, setActive }) {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <header className="topbar">
      <a className="brand" href="#start" onClick={() => setActive("start")} aria-label="Beyond the Dashboard home">
        <span className="brand-mark"><Activity size={20} /></span>
        <span>BEYOND THE DASHBOARD</span>
      </a>
      <button className="mobile-menu" aria-label={menuOpen ? "Close navigation" : "Open navigation"} onClick={() => setMenuOpen(!menuOpen)}>
        {menuOpen ? <X size={20} /> : <Menu size={20} />}
      </button>
      <nav className={menuOpen ? "nav open" : "nav"} aria-label="Main navigation">
        {sections.map((s) => (
          <button key={s.id} className={active === s.id ? "nav-link active" : "nav-link"}
            onClick={() => { setActive(s.id); setMenuOpen(false); document.getElementById(s.id)?.scrollIntoView({ behavior: "smooth" }); }}>
            {s.label}
          </button>
        ))}
      </nav>
    </header>
  );
}

function SectionHeading({ eyebrow, title, children }) {
  return <div className="section-heading">
    <div className="eyebrow">{eyebrow}</div>
    <h2>{title}</h2>
    {children && <p className="section-intro">{children}</p>}
  </div>;
}

function StartSection({ setActive }) {
  return <>
  <section id="start" className="hero section">
    <div className="hero-copy">
      <h1>Beyond the<br /><span>dashboard.</span></h1>
      <p className="hero-lede">Explore how Big Data and learning analytics can help educators understand learning patterns, identify where learners may need support, and make more informed educational decisions.</p>
      <p className="hero-audience"><strong>Who is this lab for?</strong> Designed for educators, instructional designers, and educational technology professionals interested in how learning data can inform educational decisions.</p>
      <div className="hero-actions">
        <button className="button primary" onClick={() => { setActive("explore"); document.getElementById("explore")?.scrollIntoView({ behavior: "smooth" }); }}>
          Enter the lab <ArrowRight size={17} />
        </button>
      </div>
    </div>
  </section>
  <section className="outcomes-strip" aria-labelledby="outcomes-title">
    <div className="container outcomes-inner"><div><span className="eyebrow">LEARNING OBJECTIVES</span><h2 id="outcomes-title">What you will be able to do</h2></div><div className="outcome-item"><span>01</span><p>Explain how Big Data differs from learning analytics.</p></div><div className="outcome-item"><span>02</span><p>Interpret a fictional dashboard and identify what it cannot show.</p></div><div className="outcome-item"><span>03</span><p>Propose a data-informed decision with a practical safeguard.</p></div></div>
  </section>
  </>;
}

const concepts = [
  { id: "volume", number: "01", title: "Volume", question: "How much data is generated?", body: "A learning platform used by thousands of learners can generate millions of records over time. Larger datasets can reveal patterns that are difficult to see in a single class, but size alone does not guarantee accurate or useful conclusions.", example: "Example: quiz attempts collected across hundreds of courses.", icon: Database },
  { id: "velocity", number: "02", title: "Velocity", question: "How quickly does data arrive?", body: "Learners may generate data whenever they open a resource, answer a poll, or submit work. Some systems process activity quickly; others analyze it later.", example: "Example: a course dashboard updating after quiz submissions.", icon: Activity },
  { id: "variety", number: "03", title: "Variety", question: "What kinds of data exist?", body: "Educational data can include scores, timestamps, discussion posts, feedback, and resource use. Different sources measure different things and may not fit neatly together.", example: "Example: combining assessment results with learner feedback.", icon: BarChart3 },
  { id: "variability", number: "04", title: "Variability", question: "How consistent is the data over time and context?", body: "The meaning and volume of data can change with course design, deadlines, learner needs, and how a platform is used. A pattern in one setting may not hold in another.", example: "Example: login activity rising before a deadline does not necessarily mean learning has improved.", icon: Activity },
];

function ExploreSection() {
  const [selected, setSelected] = useState("volume");
  const [answer, setAnswer] = useState("");
  const [checked, setChecked] = useState(false);
  const item = concepts.find(c => c.id === selected);
  const Icon = item.icon;
  return <section id="explore" className="section section-light">
    <div className="container">
      <SectionHeading eyebrow="MISSION 01 · THE FOUNDATIONS" title="Explore Big Data">
        Big Data refers to datasets whose scale, complexity, or rate of generation creates challenges for conventional data-management and analysis approaches (Chang & Grady, 2019). Learning analytics is the measurement, collection, analysis, and reporting of data about learners and their contexts to understand and improve learning and the environments in which it occurs (Samsul et al., 2023). The concepts overlap, but they are not interchangeable.
      </SectionHeading>
      <div className="concept-layout">
        <div className="concept-tabs" role="tablist" aria-label="Big Data characteristics">
          {concepts.map(c => {
            const I = c.icon;
            return <button key={c.id} role="tab" aria-selected={selected === c.id} className={selected === c.id ? "concept-tab selected" : "concept-tab"} onClick={() => setSelected(c.id)}>
              <span className="tab-number">{c.number}</span><span><strong>{c.title}</strong><small>{c.question}</small></span><ChevronRight size={17} />
            </button>;
          })}
        </div>
        <div className="concept-panel" role="tabpanel">
          <div className="panel-icon"><Icon size={25} /></div>
          <div className="eyebrow">THE {item.title.toUpperCase()} OF DATA</div>
          <h3>{item.question}</h3>
          <p>{item.body}</p>
          <div className="example-box"><span className="example-label">IN EDUCATION</span>{item.example}</div>
        </div>
      </div>
      <div className="distinction">
        <div className="distinction-label"><BookOpen size={18} /> DON'T MIX THESE UP</div>
        <div className="distinction-grid">
          <div><strong>Big Data</strong><p>Datasets whose scale, complexity, or rate of generation creates challenges for conventional data management and analysis (Chang &amp; Grady, 2019).</p></div>
          <div><strong>Learning analytics</strong><p>The measurement, collection, analysis, and reporting of data about learners and their contexts to understand and improve learning and learning environments (Samsul et al., 2023).</p></div>
          <div><strong>Educational decisions</strong><p>Actions informed by evidence, professional knowledge, learner feedback, and context. Analytics can inform a decision, but it should not make the decision automatically.</p></div>
        </div>
      </div>
      <p className="research-note">Research connection: Big Data refers to the scale and complexity of data; learning analytics focuses on interpreting learner and context data to understand and improve learning. These concepts overlap, but they serve different purposes (Samsul et al., 2023).</p>
      <KnowledgeCheck />
    </div>
  </section>;
}

function KnowledgeCheck() {
  const [choice, setChoice] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const options = [
    { id: "a", text: "More data automatically means better teaching decisions." },
    { id: "b", text: "Data can reveal patterns, but the patterns need careful interpretation." },
    { id: "c", text: "Learning analytics and Big Data mean exactly the same thing." },
  ];
  return <div className="quiz-card">
    <div className="quiz-tag">QUICK CHECK <span>· 1 QUESTION</span></div>
    <h3>Which statement is most accurate?</h3>
    <div className="quiz-options">
      {options.map(o => <button key={o.id} className={`quiz-option ${choice === o.id ? "chosen" : ""} ${submitted && o.id === "b" ? "correct" : ""}`} onClick={() => { setChoice(o.id); setSubmitted(false); }}>
        <span className="option-letter">{o.id.toUpperCase()}</span><span>{o.text}</span>{submitted && o.id === "b" && <CheckCircle2 size={18} />}
      </button>)}
    </div>
    {!submitted ? <button className="button dark" disabled={!choice} onClick={() => setSubmitted(true)}>Check answer <ArrowRight size={16} /></button> :
      <div className={choice === "b" ? "feedback good" : "feedback"}><strong>{choice === "b" ? "Exactly." : "Not quite."}</strong> Big Data can reveal patterns, but data quality, context, and professional judgement matter when interpreting them. <button className="text-button" onClick={() => { setChoice(""); setSubmitted(false); }}>Try again</button></div>}
  </div>;
}

const groupData = {
  engagement: {
    label: "Platform activity",
    unit: "weekly logins",
    a: [5, 6, 4, 5, 5, 6],
    b: [2, 2, 3, 1, 2, 2],
    insight: "Group A logs in more often, but login frequency alone does not establish learning or understanding."
  },
  outcomes: {
    label: "Learning outcomes",
    unit: "average quiz score",
    a: [78, 81, 80, 84, 82, 85],
    b: [82, 84, 83, 85, 84, 86],
    insight: "In this fictional example, Group B has slightly higher quiz scores despite fewer logins. This does not show that fewer logins cause better performance."
  },
  completion: {
    label: "Course progress",
    unit: "assignment completion (%)",
    a: [85, 88, 87, 90, 89, 90],
    b: [90, 91, 92, 92, 93, 92],
    insight: "Completion is another useful indicator, but it still cannot tell us everything about learning quality, confidence, or long-term retention."
  }
};


function LifecycleSection() {
  const [step, setStep] = useState("collect");
  const [source, setSource] = useState("lms");
  const stages = {
    collect: { number: "01", title: "Collect", question: "What is being recorded?", detail: "A learning platform may record logins, clicks, quiz attempts, time stamps, submitted work, and discussion activity. These records describe interactions with a system, not the learner's full experience.", check: "Could learners study offline, use assistive technology, or access materials in ways the platform does not record?" },
    prepare: { number: "02", title: "Prepare", question: "Can the records be trusted and compared?", detail: "Data may be missing, duplicated, inconsistently formatted, or collected differently across tools. Before combining sources, a team needs to understand how each field was generated and what it means.", check: "Do the groups use the same platform, course design, deadlines, and tracking settings?" },
    analyze: { number: "03", title: "Analyze", question: "What pattern appears, and what else could explain it?", detail: "Analysts can summarize trends, compare groups, or build predictive models. A pattern is not automatically a cause. An association between platform activity and scores does not prove that one caused the other.", check: "What other explanations could account for this pattern? What evidence would help distinguish them?" },
    visualize: { number: "04", title: "Visualize", question: "How is the pattern presented?", detail: "Dashboards turn analysis into charts, summaries, and indicators. Choices about categories, scales, time windows, and missing values can shape what viewers notice or overlook.", check: "Could another chart, comparison, or time window change the story the dashboard appears to tell?" },
    act: { number: "05", title: "Act and review", question: "What should happen because of the analysis?", detail: "A dashboard is useful only when its interpretation supports an appropriate action. Decisions should be proportionate, explainable, reviewed by people with relevant expertise, and monitored for unintended consequences.", check: "Who is accountable for the decision, how can it be challenged, and how will its effects be evaluated?" }
  };
  const current = stages[step];
  const sourceDetails = {
    lms: { title: "Learning management system", records: "logins, page views, quiz attempts, assignment submissions", reveals: "When and how learners interact with platform features.", misses: "Understanding, motivation, offline work, and the reasons behind activity." },
    forum: { title: "Discussion forum", records: "posts, replies, timestamps, reactions", reveals: "Visible participation and some patterns of peer interaction.", misses: "Private conversations, quality of thought not expressed in posts, and barriers to posting." },
    mobile: { title: "Mobile learning app", records: "app opens, downloads, notifications, short practice sessions", reveals: "Some learning activity across times and locations.", misses: "Whether notifications are welcome, whether content was understood, and activity outside the app." },
    assessment: { title: "Assessment tool", records: "answers, scores, attempts, feedback viewed", reveals: "Performance on particular tasks and changes across attempts.", misses: "All learning goals, contextual barriers, collaboration, and knowledge beyond the assessment." }
  };
  const detail = sourceDetails[source];
  return <section id="lifecycle" className="section lifecycle-section">
    <div className="container">
      <SectionHeading eyebrow="MISSION 02 · FOLLOW THE DATA" title="From everyday actions to Big Data">
        Educational platforms generate many different records. Explore the lifecycle from collection and preparation through analysis, visualization, and action. Choices at each stage shape what can be concluded from the data (Chang & Grady, 2019).
      </SectionHeading>
      <div className="lifecycle-layout">
        <div className="lifecycle-steps" role="tablist" aria-label="Data lifecycle stages">
          {Object.entries(stages).map(([key, value]) => <button key={key} className={step === key ? "lifecycle-step active" : "lifecycle-step"} onClick={() => setStep(key)} role="tab" aria-selected={step === key}>
            <span>{value.number}</span><strong>{value.title}</strong><ChevronRight size={17}/>
          </button>)}
        </div>
        <div className="lifecycle-content" role="tabpanel">
          <span className="eyebrow">STAGE {current.number}</span>
          <h3>{current.question}</h3>
          <p>{current.detail}</p>
          <div className="reflection-prompt"><Lightbulb size={18}/><div><strong>Ask yourself</strong><p>{current.check}</p></div></div>
        </div>
      </div>
      <div className="source-explorer">
        <div className="eyebrow">EXPLORE THE SOURCES</div>
        <h3>One learning experience, many data traces</h3>
        <p className="source-intro">Choose a digital tool to explore the types of data it may generate. These examples illustrate what can be collected, not what should necessarily be collected.</p>
        <div className="source-selectors">
          {Object.entries(sourceDetails).map(([key, val]) => <button key={key} className={source === key ? "source-chip active" : "source-chip"} onClick={() => setSource(key)}>{val.title}</button>)}
        </div>
        <div className="source-detail">
          <div><span className="source-label">POSSIBLE RECORDS</span><p>{detail.records}</p></div>
          <div><span className="source-label">MAY HELP REVEAL</span><p>{detail.reveals}</p></div>
          <div><span className="source-label">DOES NOT SHOW BY ITSELF</span><p>{detail.misses}</p></div>
        </div>
        <div className="responsibility-note"><strong>A question of responsibility</strong><p>Digital tools can generate many types of data, but not every available data point needs to be collected. Educators should consider why information is needed, how it will be protected, and whether collecting it supports a meaningful educational purpose (Guan et al., 2023).</p><p>Mobile learning apps may record interactions across different times and settings, but those records do not necessarily capture learning that happens offline or explain a learner’s circumstances (Stojanov & Daniel, 2024).</p></div>
      </div>
      <div className="key-terms">
        <div className="eyebrow">QUICK GLOSSARY</div><h3>Terms worth knowing</h3>
        <div className="terms-grid">
          <div><strong>Data point</strong><p>A recorded value or observation, such as a quiz score or timestamp.</p></div>
          <div><strong>Dataset</strong><p>A collection of related records organized for use or analysis.</p></div>
          <div><strong>Learning analytics</strong><p>The measurement, collection, analysis, and reporting of data about learners and their contexts to understand and optimize learning and the environments in which it occurs (Samsul et al., 2023).</p></div>
          <div><strong>Predictive model</strong><p>A method that uses patterns in existing data to estimate an outcome. Its predictions can be inaccurate or reflect biases in the data (Guan et al., 2023).</p></div>
          <div><strong>Data governance</strong><p>The roles, policies, processes, and safeguards that guide how data is collected, accessed, shared, retained, and used (Chang & Grady, 2019).</p></div>
          <div><strong>Correlation and causation</strong><p>Two things may vary together without one causing the other. Additional evidence is needed to support causal claims.</p></div>
        </div>
      </div>
    </div>
  </section>;
}

function MiniChart({ values, color, label }) {
  const max = Math.max(...values) * 1.18;
  return <div className="bar-chart" role="img" aria-label={`${label}: ${values.join(", ")}`}>
    {values.map((v, i) => <div className="bar-column" key={i}>
      <span className="bar-value">{v}</span><div className="bar-track"><div className="bar" style={{ height: `${(v / max) * 100}%`, background: color }} /></div><span className="bar-label">W{i + 1}</span>
    </div>)}
  </div>;
}

function DashboardSection() {
  const [metric, setMetric] = useState("engagement");
  const data = groupData[metric];
  return <section id="dashboard" className="section dashboard-section">
    <div className="container">
      <SectionHeading eyebrow="MISSION 03 · FIND THE PATTERN" title="Investigate the dashboard">
Educational technologies can generate large and varied datasets through learning platforms, assessments, and mobile applications. Learning analytics offers one way to examine these records and identify patterns that may inform educational decisions. This fictional dashboard uses a simplified dataset of 1,200 learners to demonstrate how educational data can be interpreted, while also highlighting what the numbers cannot reveal. Compare the groups, switch indicators, and ask what the charts can and cannot tell you. Learning analytics research cautions that platform records are only partial measures of learning and can overlook educational context (Stojanov & Daniel, 2024; García-García et al., 2026).
      </SectionHeading>
      <div className="dashboard">
        <div className="dashboard-head">
          <div><span className="status-dot" /> SAMPLE COURSE ANALYTICS <span className="fictional-tag">FICTIONAL DATA</span></div>
          <span className="dashboard-date">6 sample weeks</span>
        </div>
        <div className="metric-switcher" role="tablist" aria-label="Choose a metric">
          {Object.entries(groupData).map(([key, val]) => <button key={key} className={metric === key ? "metric-tab active" : "metric-tab"} onClick={() => setMetric(key)}>{val.label}</button>)}
        </div>
        <div className="chart-title"><div><h3>{data.label}</h3><p>{data.unit}</p></div><span className="chart-badge">WEEKLY SNAPSHOT</span></div>
        <div className="chart-groups">
          <div className="chart-group"><div className="chart-group-title"><span className="legend-dot blue" /> Group A</div><MiniChart values={data.a} color="#6385F5" label="Group A" /></div>
          <div className="chart-group"><div className="chart-group-title"><span className="legend-dot mint" /> Group B</div><MiniChart values={data.b} color="#35B9A5" label="Group B" /></div>
        </div>
        <div className="chart-insight"><Eye size={18} /><div><strong>Look closer</strong><p>{data.insight}</p></div></div>
        <div className="dashboard-foot"><span><span className="legend-dot blue" /> Group A</span><span><span className="legend-dot mint" /> Group B</span><span>Illustrative data only. Not real student records.</span></div>
      </div>
      <div className="prompt-row">
        <div className="prompt-number">?</div>
        <div><strong>Pause before interpreting</strong><p>What other information would you want before deciding which group needs support? Consider assessment context, accessibility, offline study, and the accuracy of platform tracking. How might your interpretation change if the platform recorded activity accurately but missed meaningful learning outside the platform? (García-García et al., 2026)</p></div>
      </div>
    </div>
  </section>;
}

function DecisionSection() {
  const [decision, setDecision] = useState("");
  const [showFeedback, setShowFeedback] = useState(false);
  const decisions = [
    { id: "warn", title: "Send automatic warning messages", summary: "Act quickly on the low-activity flag.", result: "This may reach learners who need help, but it assumes that low recorded activity means a problem. Validate the alert and consider a supportive, non-punitive message before drawing conclusions." },
    { id: "ignore", title: "Ignore the dashboard completely", summary: "The data is incomplete, so do nothing.", result: "Recognizing limitations is important, but ignoring a possible signal may also miss an opportunity to help. Use the alert as a starting point for investigation, not as a final verdict." },
    { id: "investigate", title: "Investigate before intervening", summary: "Check outcomes, data quality, and learner context.", result: "This is the strongest first step. Compare the alert with relevant learning outcomes, check how activity is recorded, and seek appropriate learner feedback. Then choose a proportionate response." },
  ];
  const selected = decisions.find(d => d.id === decision);
  return <section id="decision" className="section section-light">
    <div className="container">
      <SectionHeading eyebrow="MISSION 04 · MAKE A DECISION" title="You're the learning designer">
        You have explored how different indicators can tell different stories about learning. Now imagine that the same learning platform flags 180 of its 1,200 learners for low engagement. The institution wants to send automated warnings. How should educators respond?
      </SectionHeading>
      <div className="scenario-banner">
        <div className="scenario-icon"><Lightbulb size={25} /></div>
        <div><span className="eyebrow">YOUR BRIEF</span><h3>180 learners flagged</h3><p>The system recorded fewer logins and completed activities than expected. It has not confirmed whether these learners are struggling academically.</p></div>
      </div>
      <div className="decision-list">
        {decisions.map((d, i) => <button key={d.id} className={`decision-option ${decision === d.id ? "selected" : ""}`} onClick={() => { setDecision(d.id); setShowFeedback(false); }}>
          <span className="decision-letter">{String.fromCharCode(65 + i)}</span><span className="decision-copy"><strong>{d.title}</strong><small>{d.summary}</small></span><span className="radio-mark">{decision === d.id && <span />}</span>
        </button>)}
      </div>
      <button className="button primary" disabled={!decision} onClick={() => setShowFeedback(true)}>Reveal the implications <ArrowRight size={16} /></button>
      {showFeedback && selected && <div className={`decision-feedback ${decision === "investigate" ? "recommended" : ""}`}><div className="feedback-icon">{decision === "investigate" ? <CheckCircle2 size={22} /> : <Eye size={22} />}</div><div><span className="eyebrow">{decision === "investigate" ? "RECOMMENDED FIRST STEP" : "THINK IT THROUGH"}</span><h3>{selected.title}</h3><p>{selected.result}</p><p>Learning analytics can identify patterns that warrant attention, but incomplete data and potentially biased predictions highlight the importance of considering learner context and professional judgment before intervening (Guan et al., 2023; Stojanov &amp; Daniel, 2024).</p><p className="follow-up"><strong>Next question:</strong> What evidence would you need before deciding whether an intervention is appropriate? What findings might change your recommendation?</p></div></div>}
    </div>
  </section>;
}

function SharedResponses({ type, refreshSignal = 0 }) {
  const [responses, setResponses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [ownedIds, setOwnedIds] = useState([]);
  const [deletingId, setDeletingId] = useState(null);
  const [deleteMessage, setDeleteMessage] = useState("");

  useEffect(() => {
    let cancelled = false;
    async function loadResponses() {
      if (!supabase) {
        setLoading(false);
        setError("Shared responses are not connected yet. The site owner needs to finish the Supabase setup.");
        return;
      }
      setLoading(true);
      const { data, error: queryError } = await supabase
        .from("lab_responses")
        .select("id, response_type, reflection, problem, data, limitation, safeguard, created_at")
        .eq("response_type", type)
        .order("created_at", { ascending: false })
        .limit(50);
      if (cancelled) return;
      if (queryError) {
        setError("We could not load shared responses. Check the Supabase table and access policies.");
      } else {
        const items = data || [];
        setResponses(items);
        setOwnedIds(items.filter(item => localStorage.getItem(`btd_delete_token_${item.id}`)).map(item => String(item.id)));
        setError("");
      }
      setLoading(false);
    }
    loadResponses();
    return () => { cancelled = true; };
  }, [type, refreshSignal]);

  async function deleteResponse(id) {
    const token = localStorage.getItem(`btd_delete_token_${id}`);
    if (!token) {
      setDeleteMessage("This browser does not have the deletion key for that response.");
      return;
    }
    if (!window.confirm("Delete your response? This cannot be undone.")) return;
    setDeletingId(id);
    setDeleteMessage("");
    try {
      const { data, error: deleteError } = await supabase.rpc("delete_own_lab_response", {
        response_id: id,
        deletion_token: token
      });
      if (deleteError) throw deleteError;
      if (data !== true) {
        setDeleteMessage("The response could not be deleted. Please try again.");
        return;
      }
      localStorage.removeItem(`btd_delete_token_${id}`);
      setResponses(current => current.filter(item => String(item.id) !== String(id)));
      setOwnedIds(current => current.filter(ownedId => ownedId !== String(id)));
      setDeleteMessage("Your response has been deleted.");
    } catch (deleteError) {
      console.error("Response deletion failed:", deleteError);
      setDeleteMessage("We could not delete your response. Please try again.");
    } finally {
      setDeletingId(null);
    }
  }

  const dateLabel = value => new Date(value).toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric" });
  return <div className="shared-wall">
    <div className="shared-wall-heading"><div><span className="eyebrow">COMMUNITY CONTRIBUTIONS</span><h4>{type === "reflection" ? "Shared reflections" : "Shared design briefs"}</h4></div><span className="shared-count">{responses.length} {responses.length === 1 ? "response" : "responses"}</span></div>
    <p className="shared-wall-note">Anonymous contributions are visible to anyone who can access this website. Please do not include names, personal details, or sensitive information.</p>
    {loading && <p className="shared-empty">Loading shared responses…</p>}
    {!loading && error && <p className="shared-empty">{error}</p>}
    {!loading && !error && responses.length === 0 && <p className="shared-empty">No responses have been shared yet. Be the first to contribute.</p>}
    {!loading && !error && responses.length > 0 && <div className="shared-response-list">{responses.map(item => <article className="shared-response" key={item.id}>
      <div className="shared-response-meta"><strong>Anonymous learner</strong><span>{dateLabel(item.created_at)}</span></div>
      {type === "reflection" ? <p>{item.reflection}</p> : <><p><strong>Learning question:</strong> {item.problem}</p><p><strong>Potential evidence:</strong> {item.data}</p><p><strong>Limitation:</strong> {item.limitation}</p><p><strong>Safeguard:</strong> {item.safeguard}</p></>}
      {ownedIds.includes(String(item.id)) && <button type="button" className="text-button" onClick={() => deleteResponse(item.id)} disabled={String(deletingId) === String(item.id)}>{String(deletingId) === String(item.id) ? "Deleting…" : "Delete my response"}</button>}
    </article>)}</div>}
    {deleteMessage && <p className="shared-empty" role="status">{deleteMessage}</p>}
  </div>;
}

function ResponsibleSection() {
  const [answers, setAnswers] = useState({});
  const [reflection, setReflection] = useState("");
  const [saved, setSaved] = useState(false);
  const [sharing, setSharing] = useState(false);
  const [shareMessage, setShareMessage] = useState("");
  const [refreshSignal, setRefreshSignal] = useState(0);
  const checks = [
    {
      id: "purpose", number: "01", title: "Purpose",
      question: "What should you check before using the engagement flag?",
      options: [
        { value: "a", label: "Collect every available learner record." },
        { value: "b", label: "Confirm the educational question and whether these metrics help answer it." },
        { value: "c", label: "Use login frequency as the main measure of engagement." },
      ], correct: "b",
      feedback: "Start with a clear educational purpose. Select only the data needed to investigate the question. More data does not automatically lead to better decisions."
    },
    {
      id: "privacy", number: "02", title: "Privacy",
      question: "What should be checked before the data is used?",
      options: [
        { value: "a", label: "Make the dashboard available to all staff." },
        { value: "b", label: "Check access, protection, retention, and transparency requirements." },
        { value: "c", label: "Remove names and assume every privacy concern is resolved." },
      ], correct: "b",
      feedback: "Privacy involves more than removing names. Consider who needs access, how information is protected and retained, whether learners understand its use, and which institutional policies apply."
    },
    {
      id: "fairness", number: "03", title: "Fairness",
      question: "Why might the low-engagement flag be misleading?",
      options: [
        { value: "a", label: "Some learners study offline or use tools and access methods the platform does not capture." },
        { value: "b", label: "Every learner uses the platform in the same way." },
        { value: "c", label: "A low activity score proves a learner is struggling." },
      ], correct: "a",
      feedback: "Platform data can represent learners unevenly. Check for missing records, accessibility needs, different study practices, and whether the indicator is appropriate for the learners being assessed."
    },
    {
      id: "accountability", number: "04", title: "Accountability",
      question: "What is the most responsible next step?",
      options: [
        { value: "a", label: "Automatically warn every learner who was flagged." },
        { value: "b", label: "Ignore the dashboard because data is imperfect." },
        { value: "c", label: "Review the flag against other evidence and use supportive human follow-up before intervening." },
      ], correct: "c",
      feedback: "Treat analytics as a signal for investigation, not a verdict. Review the evidence and context, then use a supportive human check-in before deciding whether action is needed."
    },
  ];
  async function shareReflection() {
    if (!supabase) { setShareMessage("Sharing is not connected yet."); return; }
    if (!reflection.trim()) return;
    setSharing(true);
    setShareMessage("");
    try {
      const token = crypto.randomUUID();
      const bytes = new TextEncoder().encode(token);
      const digest = await crypto.subtle.digest("SHA-256", bytes);
      const tokenHash = Array.from(new Uint8Array(digest)).map(b => b.toString(16).padStart(2, "0")).join("");
      const { data, error } = await supabase.from("lab_responses").insert({
        response_type: "reflection", reflection: reflection.trim(), deletion_token_hash: tokenHash
      }).select("id").single();
      if (error) throw error;
      localStorage.setItem(`btd_delete_token_${data.id}`, token);
      setSaved(true);
      setShareMessage("Your reflection has been shared anonymously with everyone who can access this website.");
      setRefreshSignal(n => n + 1);
    } catch (error) {
      console.error("Reflection submission failed:", error);
      setShareMessage("Your response could not be shared. Please try again.");
    } finally { setSharing(false); }
  }
  const answeredCount = checks.filter((item) => answers[item.id]).length;
  return <section id="responsible" className="section responsible-section">
    <div className="container">
      <SectionHeading eyebrow="MISSION 05 · CHALLENGE THE DATA" title="Responsible data, better decisions">
        Learning analytics can support educational decisions, but it also raises questions about privacy, bias, and how learners may be affected by data-based judgments. Ethical use requires considering not only what the data reveals, but also how decisions are made and who may be affected (Guan et al., 2023). Use the four checks below to examine purpose, privacy, fairness, and accountability.
      </SectionHeading>
      <div className="challenge-intro">
        <span className="eyebrow">YOUR SCENARIO</span>
        <h3>180 learners have been flagged for low engagement.</h3>
        <p>The institution wants to send automatic warning messages based on login frequency and completed activities. Before approving the plan, evaluate how the data will be used.</p>
        <div className="challenge-progress" aria-live="polite"><span>{answeredCount} of {checks.length} checks completed</span><div className="challenge-progress-track"><span style={{ width: `${(answeredCount / checks.length) * 100}%` }} /></div></div>
      </div>
      <div className="challenge-checks">
        {checks.map((item) => {
          const selected = answers[item.id];
          const isCorrect = selected === item.correct;
          return <article className="challenge-check" key={item.id}>
            <div className="challenge-check-top"><span className="challenge-number">{item.number}</span><span className="eyebrow">{item.title}</span></div>
            <h3>{item.question}</h3>
            <div className="challenge-options" role="group" aria-label={`${item.title} answer options`}>
              {item.options.map((option) => <button type="button" key={option.value}
                className={`challenge-option ${selected === option.value ? (option.value === item.correct ? "selected correct" : "selected incorrect") : ""}`}
                aria-pressed={selected === option.value}
                onClick={() => setAnswers((previous) => ({ ...previous, [item.id]: option.value }))}>
                <span className="challenge-option-marker">{String.fromCharCode(65 + item.options.findIndex((x) => x.value === option.value))}</span>
                <span>{option.label}</span>
              </button>)}
            </div>
            {selected && <div className={`challenge-feedback ${isCorrect ? "good" : "needs-review"}`} role="status">
              <strong>{isCorrect ? "Good thinking" : "Consider another angle"}</strong>
              <p>{item.feedback}</p>
              {!isCorrect && <p className="challenge-hint">Review the options and select the response that best supports responsible educational decision-making.</p>}
            </div>}
          </article>;
        })}
      </div>
      {answeredCount === checks.length && <div className="challenge-complete" role="status"><CheckCircle2 size={22}/><div><strong>All four checks explored</strong><p>Before acting on a dashboard, confirm the purpose, protect learner information, examine possible bias or missing context, and ensure a person reviews the evidence.</p></div></div>}
      <div className="reflection-card">
        <div className="reflection-head"><div className="reflection-icon"><BookOpen size={20} /></div><div><span className="eyebrow">FINAL REFLECTION</span><h3>What would you do with the data?</h3></div></div>
        <p>In a few sentences, describe one opportunity, one limitation, and one safeguard you would consider before using learning analytics.</p>
        <p className="reflection-tradeoff"><strong>Consider a trade-off:</strong> Collecting more information might help identify learners who need support, but it can also create privacy risks. How would you balance these priorities in your decision?</p>
        <textarea value={reflection} onChange={e => { setReflection(e.target.value); setSaved(false); setShareMessage(""); }} placeholder="I could use learning analytics to… However, the data might not show… Before acting, I would…" rows={4} maxLength={3000} />
        <div className="reflection-actions"><span>{reflection.trim().split(/\s+/).filter(Boolean).length} words · Responses are only shared if you choose to submit them.</span><button className="button dark" onClick={shareReflection} disabled={!reflection.trim() || sharing}>{sharing ? "Sharing…" : "Share anonymously"} <CheckCircle2 size={16} /></button></div>
        {shareMessage && <div className={`feedback ${saved ? "good" : ""}`} role="status">{shareMessage}</div>}
      </div>
      <SharedResponses type="reflection" refreshSignal={refreshSignal} />
      <div className="closing-note"><Sparkles size={21} /><div><strong>Remember: data provides clues, not the whole story.</strong><p>Use analytics to guide questions and inform professional judgement, not to replace it.</p></div></div>
    </div>
  </section>;
}

function ApplySection() {
  const [problem, setProblem] = useState("");
  const [data, setData] = useState("");
  const [limit, setLimit] = useState("");
  const [safeguard, setSafeguard] = useState("");
  const [showPlan, setShowPlan] = useState(false);
  const [sharing, setSharing] = useState(false);
  const [shareMessage, setShareMessage] = useState("");
  const [refreshSignal, setRefreshSignal] = useState(0);
  async function shareBrief() {
    if (!supabase) { setShareMessage("Sharing is not connected yet."); return; }
    if (!problem.trim() || !data.trim() || !limit.trim() || !safeguard.trim()) return;
    setSharing(true);
    setShareMessage("");
    try {
      const token = crypto.randomUUID();
      const bytes = new TextEncoder().encode(token);
      const digest = await crypto.subtle.digest("SHA-256", bytes);
      const tokenHash = Array.from(new Uint8Array(digest)).map(b => b.toString(16).padStart(2, "0")).join("");
      const { data: inserted, error } = await supabase.from("lab_responses").insert({
        response_type: "design_brief", problem: problem.trim(), data: data.trim(),
        limitation: limit.trim(), safeguard: safeguard.trim(), deletion_token_hash: tokenHash
      }).select("id").single();
      if (error) throw error;
      localStorage.setItem(`btd_delete_token_${inserted.id}`, token);
      setShareMessage("Your design brief has been shared anonymously with everyone who can access this website.");
      setRefreshSignal(n => n + 1);
    } catch (error) {
      console.error("Design brief submission failed:", error);
      setShareMessage("Your design brief was not shared. Please try again later.");
    } finally { setSharing(false); }
  }
  return <section id="apply" className="section apply-section">
    <div className="container">
      <SectionHeading eyebrow="MISSION 06 · TRANSFER YOUR LEARNING" title="Design a responsible data use">
        You've explored how learning data can reveal patterns, inform decisions, and raise questions about privacy, fairness, and accountability. Now apply these ideas to an educational context you know by developing a short design brief.
      </SectionHeading>
      <div className="design-brief">
        <div className="brief-intro"><div className="panel-icon"><Sparkles size={24}/></div><span className="eyebrow">YOUR CHALLENGE</span><h3>Start with a learning problem, not a dashboard.</h3><p>Choose one question that educators genuinely need to answer. Then identify the minimum useful data and the risks that should be addressed before acting.</p></div>
        <div className="brief-fields">
          <label htmlFor="problem">1. What learning problem or question do you want to understand?</label>
          <textarea id="problem" value={problem} onChange={e=>{setProblem(e.target.value);setShowPlan(false);setShareMessage("");}} rows={2} maxLength={1500} placeholder="For example: Which parts of an online module are learners finding difficult?"/>
          <label htmlFor="data">2. What data could help answer the question, and why?</label>
          <textarea id="data" value={data} onChange={e=>{setData(e.target.value);setShowPlan(false);setShareMessage("");}} rows={2} maxLength={1500} placeholder="Choose specific data, not every possible data point."/>
          <label htmlFor="limit">3. What might this data fail to show or misrepresent?</label>
          <textarea id="limit" value={limit} onChange={e=>{setLimit(e.target.value);setShowPlan(false);setShareMessage("");}} rows={2} maxLength={1500} placeholder="Consider missing data, context, accessibility, or bias."/>
          <label htmlFor="safeguard">4. What safeguard or human review would you put in place, and why is it appropriate for your context?</label>
          <p className="field-hint">Consider how an educator could check the data, involve learners, or review a decision before taking action.</p>
          <textarea id="safeguard" value={safeguard} onChange={e=>{setSafeguard(e.target.value);setShowPlan(false);setShareMessage("");}} rows={2} maxLength={1500} placeholder="Think about privacy, consent, transparency, and accountability."/>
          <button className="button primary" disabled={!problem.trim()||!data.trim()||!limit.trim()||!safeguard.trim()} onClick={()=>setShowPlan(true)}>Review my design brief <ArrowRight size={16}/></button>
          {showPlan && <div className="design-summary"><div className="eyebrow">YOUR DRAFT PLAN</div><p><strong>Learning question:</strong> {problem}</p><p><strong>Potential evidence:</strong> {data}</p><p><strong>Limitation to check:</strong> {limit}</p><p><strong>Safeguard:</strong> {safeguard}</p><p className="summary-note">Your draft is not shared unless you select the button below.</p><button className="button dark" onClick={shareBrief} disabled={sharing}>{sharing ? "Sharing…" : "Share design brief anonymously"} <ArrowRight size={16}/></button>{shareMessage && <p className="share-message" role="status">{shareMessage}</p>}</div>}
        </div>
      </div>
      <SharedResponses type="design_brief" refreshSignal={refreshSignal} />
      <aside className="classroom-resource" aria-labelledby="classroom-resource-title">
        <div className="classroom-resource-icon"><BookOpen size={23} aria-hidden="true" /></div>
        <div className="classroom-resource-content">
          <span className="eyebrow">OPTIONAL EDUCATOR RESOURCE</span>
          <h3 id="classroom-resource-title">Take It Into Your Classroom</h3>
          <p>Want to explore learning analytics with your own learners? Use this adaptable activity to interpret fictional engagement data, question what a dashboard can reveal, and recommend a responsible educational response.</p>
          <p className="classroom-resource-details"><strong>Can You Trust the Dashboard?</strong> · Classroom activity and facilitator guide · 20–30 minutes (adaptable)</p>
          <a className="button primary classroom-resource-link" href="https://docs.google.com/document/d/1nKrErWKEPruoq_u2CvvcKuG9j1PlNSP4_G0VOmJrrlM/edit?usp=sharing" target="_blank" rel="noopener noreferrer" aria-label="Open Can You Trust the Dashboard classroom activity in Google Docs (opens in a new tab)">Open classroom activity <ArrowRight size={16} aria-hidden="true" /></a>
          <p className="classroom-resource-note">To adapt the activity, open the document and select File → Make a copy.</p>
        </div>
      </aside>
      <p className="classroom-resource-note">Have suggestions for improving this resource? Share your feedback through the ETEC 523 Movable Feast discussion.</p>
      <div className="evidence-note"><BookOpen size={20}/><div><strong>How to use this resource beyond the activity</strong><p>Return to the sources below to investigate a concept in more depth. Compare the general principles with the policies and responsibilities that apply in your own institution and jurisdiction.</p></div></div>
    </div>
  </section>;
}

function Footer() {
  return <footer className="footer">
    <div className="footer-top"><div className="brand footer-brand"><span className="brand-mark"><Activity size={19} /></span><span>BEYOND THE DASHBOARD</span></div><span className="footer-caption">A mobile-first learning resource for educational technology professionals</span></div>
    <div className="footer-grid">
      <div><h4>Big Data and learning analytics</h4>
        <p>Chang, W. L., & Grady, N. (2019). <em>NIST Big Data interoperability framework: Volume 1, definitions.</em> NIST Special Publication 1500-1r2.</p><a href="https://doi.org/10.6028/NIST.SP.1500-1r2" target="_blank" rel="noreferrer">Read the NIST report ↗</a>
        <p>Samsul, S. A., Yahaya, N., & Abuhassna, H. (2023). Education big data and learning analytics: A bibliometric analysis. <em>Humanities and Social Sciences Communications, 10</em>, 709.</p><a href="https://doi.org/10.1057/s41599-023-02176-x" target="_blank" rel="noreferrer">Read the article ↗</a>
        <p>Stojanov, A., & Daniel, B. K. (2024). A decade of research into the application of big data and analytics in higher education: A systematic review of the literature. <em>Education and Information Technologies, 29</em>, 5807–5831.</p><a href="https://doi.org/10.1007/s10639-023-12033-8" target="_blank" rel="noreferrer">Read the review ↗</a>
      </div>
      <div><h4>Ethics, context, and responsible use</h4>
        <p>Guan, X., Feng, X., & Islam, A. A. (2023). The dilemma and countermeasures of educational data ethics in the age of intelligence. <em>Humanities and Social Sciences Communications, 10</em>, 138.</p><a href="https://doi.org/10.1057/s41599-023-01633-x" target="_blank" rel="noreferrer">Read the article ↗</a>
        <p>García-García, F. J., Gómez-Núñez, M. I., & Molla-Esparza, C. (2026). Applications of learning analytics in the study of academic performance in higher education: A meta-review with an educational perspective. <em>Higher Education.</em></p><a href="https://doi.org/10.1007/s10734-026-01709-y" target="_blank" rel="noreferrer">Read the meta-review ↗</a>
        <p>These sources discuss data characteristics, learning analytics applications, methodological limitations, privacy, bias, and the importance of interpreting evidence within educational context.</p>
      </div>
    </div>
    <div className="license-box"><BookOpen size={18} /><div><strong>AI Use Statement</strong><p>ChatGPT (OpenAI) was used to assist with website development, coding, troubleshooting, and refining written content.</p></div></div>
    <div className="license-box"><ShieldCheck size={18} /><div><strong>Creative Commons License</strong><p>© 2026 Christina Nolan. Except where otherwise noted, original educational content in <em>Beyond the Dashboard</em> is licensed under a <a href="https://creativecommons.org/licenses/by/4.0/" target="_blank" rel="noreferrer">Creative Commons Attribution 4.0 International License (CC BY 4.0) ↗</a>. Third-party materials and participant contributions are excluded.</p></div></div>
    <div className="footer-bottom"><span>Designed for learning, reflection, and reuse.</span><button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>Back to top ↑</button></div>
  </footer>;
}

function App() {
  const [active, setActive] = useState("start");
  return <>
    <Header active={active} setActive={setActive} />
    <main>
      <StartSection setActive={setActive} />
      <ExploreSection />
      <LifecycleSection />
      <DashboardSection />
      <DecisionSection />
      <ResponsibleSection />
      <ApplySection />
    </main>
    <Footer />
    <div className="mobile-progress" aria-hidden="true"><span /></div>
  </>;
}

createRoot(document.getElementById("root")).render(<App />);
