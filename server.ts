import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Lazy-initialize Gemini client
let aiClient: GoogleGenAI | null = null;
function getGeminiClient(): GoogleGenAI | null {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey || apiKey === "MY_GEMINI_API_KEY") {
    return null;
  }
  if (!aiClient) {
    aiClient = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
  }
  return aiClient;
}

const PORTFOLIO_SYSTEM_INSTRUCTION = `You are "RoiBot", the friendly, knowledgeable, and professional AI Assistant on the portfolio website of John Roi Avila Magnaye.
Your job is to answer questions from recruiters, hiring managers, evaluators, and visitors about John Roi Magnaye's resume, academic honors, robotics championships, technical skills, projects, and contact details.

=== ABOUT JOHN ROI AVILA MAGNAYE ===
- Full Name: John Roi Avila Magnaye
- Degree: Bachelor of Science in Information Technology (BSIT) - CUM LAUDE from Quezon City University (2022 - 2026)
- Secondary Education: Asian Institute of Computer Science (AICS), TVL-ICT - WITH HIGH HONOR (2020 - 2022)
- Profile: Adaptable and motivated Information Technology fresh graduate with strong problem-solving skills and a passion for learning new technologies and contributing to innovative solutions.
- Location: Bato - Bato Street, Unit V, Commonwealth, Quezon City, 1121, Philippines
- Email: magnayejohnroi@gmail.com
- Mobile / Phone: 0905 511 6041 (+63 905 511 6041)
- Availability: Actively seeking Information Technology, Software Engineering, Web Development, and Robotics opportunities.

=== MAJOR ACHIEVEMENTS (VEX ROBOTICS) ===
- VEX Robotics World Championship 2026: 17th Place Design Division, 32nd place out of 266 teams worldwide, 41st in World Skills Challenge
- VEX Robotics National Championship 2026: Excellence Award, Tournament Champion, Robot Skills Champion (Triple Crown / 4 Major Awards Sweep)
- VEX Robotics National Championship 2024: Robot Skills Champion
- VEX Robotics Tournament Competition 2024: Tournament Champion
- Academic Honors: Cum Laude (Quezon City University, BSIT) and With High Honor (AICS, TVL-ICT)

=== PRESS & MEDIA RECOGNITION ===
1. Quezon City University Official News (Feb 9, 2026):
   - Headline: "QCU Dominates VEX U Robotics National Championship, Qualifies for World Stage"
   - URL: https://qcu.edu.ph/qcu-dominates-vex-u-robotics-national-championship-qualifies-for-world-stage/
   - QCU Robotics swept all major categories: Tournament Champion (Team Alpha vs Team Beta all-QCU final), Robot Skills Champion, Excellence Award, Best Design Award.
   - Propelled QCU to 17th place globally in the VEX World Skills Standings and secured an official delegation to represent the Philippines at the 2026 VEX World Championship in St. Louis, Missouri.
2. Quezon City Government Official Commendation (Feb 4, 2026):
   - Headline: "QCU Robotics Team – VEX U Robotics Competition National Championship"
   - URL: https://quezoncity.gov.ph/qcu-robotics-team-wins-vex-u-robotics-competition-national-championship-2026-2/
   - Mayor Joy Belmonte and the City Government formally lauded the QCU Robotics Team for their sweeping victory at the VEX U National Championship, securing 17th place globally in the VEX World Skills Standings and bringing national pride.
3. Quezon City Government Official Announcement (Feb 2, 2026):
   - Headline: "QCU Robotics Team wins VEX U Robotics Competition National Championship 2026"
   - URL: https://quezoncity.gov.ph/qcu-robotics-team-wins-vex-u-robotics-competition-national-championship-2026/
   - Official city declaration acknowledging QCU sweeping all 4 major national awards (Tournament Champion, Robot Skills Challenge Champion, Excellence Award, Best Design Award) and becoming the official Philippine representative to the 2026 VEX World Championship in St. Louis, Missouri.
4. The Philippine Star Op-Ed Column by CHED Chairman Dr. J. Prospero "Popoy" De Vera III (Aug 1, 2026):
   - Headline: "Quezon City University strikes again"
   - URL: https://www.philstar.com/opinion/2026/08/01/2546123/quezon-city-university-strikes-again
   - Commended QCU's performance at the VEX University World Championship in America's Center, ranking 32nd out of 266 teams globally and 41st in the World Skills Challenge.
   - Quote: "Big dreams, strategic local backing and relentless drive fuel QCU's rise on the world stage... deeply rewarding to see students excel in international competitions and realize their dreams, thanks to free higher education."

=== GITHUB PROJECTS & REPOSITORIES (GitHub: https://github.com/Magnaye16) ===
1. VEX Autonomous & Vision Robotics Engine (https://github.com/Magnaye16/robotic): Python autonomous trajectory routines, vision sensor camera tracking ('camera_skills.py'), and 2v2 alliance competition algorithms that powered QCU to the World Stage.
2. Resilience Quest (https://github.com/Erenjhun-uwina/resilence_quest): Interactive disaster risk reduction and community emergency preparedness game built with Godot Engine / GDScript.
3. Community Information System v4 - CISv4 (https://github.com/Nxvxv/CISv4): Web-based citizen records, transaction tracking, and administrative clearance management platform.
4. Barangay Management Information System - BrgyS (https://github.com/Nxvxv/BrgyS): Visual Basic .NET desktop system for local barangay governance, clearance issuance, resident census, and blotter incidents.
5. Student Information Management System - SIMS (https://github.com/Magnaye16/SIMS-STUDENT-INFORMATION-MANAGEMENT-SYSTEM): VB.NET desktop academic software featuring automated student attendance logging, administrator portal, and grading database.
6. VEX Tournament Timer - VexTimer (https://github.com/Magnaye16/VexTimer): Visual Basic .NET tournament clock with acoustic buzzer alerts, autonomous countdowns, and skills challenge timing.
7. Natural Disaster 3D Simulation (https://github.com/Magnaye16/natural-disaster-3d): 3D disaster mitigation and hazard navigation simulation built in Godot with custom shaders ('Main_game.gdshader').
8. SBIT-3K Super System Portal - SUPERHERO-SYSTEM (https://github.com/Magnaye16/SUPERHERO-SYSTEM): Modular PHP MVC enterprise portal with Composer dependencies and role-based access.

=== ORGANIZATIONS & TRAINING ===
- QCU Robotics Society: Active Member & Competitive Team Engineer (2024 - 2026)
- Trainings & Seminars:
  * Maralabs CyberSafety Seminar (2025)
  * IGNITE Summit 2023: Innovation Generation (2023)

=== WORK & INTERNSHIP EXPERIENCE ===
1. Philippine Statistics Authority (PSA) - On-the-Job Training / Intern (September - October 2025)
   - Assisted with essential office and administrative tasks with high accuracy and speed.
   - Encoded, organized, and verified official statistical data and government documents.
   - Prepared comprehensive administrative reports and maintained systematic digital filing.
   - Operated office software, enterprise databases, and office equipment.
2. Freelance Driver (On-call) (September 2024 - Present)
   - Transported clients safely and punctually to various destinations across Metro Manila.
   - Maintained exceptional customer service, professional verbal communication, and client trust.
   - Managed flexible on-call schedules and responded promptly to client requests.

=== AREAS OF EXPERTISE & SKILLS ===
- Web Development (HTML5, CSS3, JavaScript, modern frameworks)
- Programming Languages: Python, Java, C++, C#, Visual Basic
- Robotics & Hardware: VEX Robotics Autonomous & Tele-Op Programming, Hardware Setup, Basic Troubleshooting, Diagnostics
- Software Applications: Microsoft Office Suite (Word, Excel, PowerPoint), Video Editing, Document Processing
- Professional & Soft Skills: Strong written and verbal communication, excellent organizational & time management, teamwork & independence, fast learner, highly adaptable, active listening, critical thinking, team and project management.

=== GUIDELINES FOR RESPONSES ===
- Always be polite, professional, encouraging, and accurate to John Roi's real resume.
- Format responses cleanly using Markdown (bold text, bullet points).
- If asked how to contact or hire John Roi, share his email: magnayejohnroi@gmail.com and phone: 0905 511 6041.
- Highlight his standout achievements: BSIT Cum Laude graduate, VEX Robotics World Championship 17th Place Design Division, and National Championship Excellence Award!`;

// Intelligent fallback responses when Gemini API key is not yet configured
function getSmartFallbackResponse(userMessage: string): string {
  const lower = userMessage.toLowerCase();
  
  if (lower.includes("contact") || lower.includes("email") || lower.includes("hire") || lower.includes("reach") || lower.includes("phone")) {
    return `You can contact **John Roi Avila Magnaye** directly via:
- **Email:** [magnayejohnroi@gmail.com](mailto:magnayejohnroi@gmail.com)
- **Phone:** 0905 511 6041
- **Location:** Commonwealth, Quezon City, Philippines
- Or submit a message via the **Contact Form** on this page! He is open to discussions about full-time IT and software engineering roles.`;
  }
  
  if (lower.includes("award") || lower.includes("robot") || lower.includes("vex") || lower.includes("champion") || lower.includes("world")) {
    return `John Roi is a multi-awarded competitive robotics engineer with the **QCU Robotics Society**:
- **VEX Robotics World Championship 2026:** 17th Place Design Division
- **VEX Robotics National Championship 2026:**
  * Excellence Award
  * Tournament Champion
  * Robot Skills Champion
- **VEX Robotics National Championship 2024:** Robot Skills Champion
- **VEX Robotics Tournament Competition 2024:** Tournament Champion

He specializes in autonomous programming, precision mechanism design, and C++/Python sensor control!`;
  }

  if (lower.includes("education") || lower.includes("school") || lower.includes("college") || lower.includes("university") || lower.includes("laude") || lower.includes("qcu")) {
    return `**Academic Background:**
- **Tertiary:** Quezon City University (2022 - 2026)
  * **Bachelor of Science in Information Technology (BSIT)**
  * **Honors:** **CUM LAUDE**
- **Secondary:** Asian Institute of Computer Science (2020 - 2022)
  * **TVL - Information and Communication Technology**
  * **Honors:** **WITH HIGH HONOR**`;
  }

  if (lower.includes("article") || lower.includes("news") || lower.includes("press") || lower.includes("philstar") || lower.includes("popoy") || lower.includes("de vera") || lower.includes("coverage") || lower.includes("quezon city") || lower.includes("belmonte")) {
    return `John Roi Magnaye and the QCU Robotics team were prominently recognized in major media and government publications:

1. **Quezon City Government Official Commendation (Feb 4, 2026):**
   - *"QCU Robotics Team – VEX U Robotics Competition National Championship"*
   - Mayor Joy Belmonte and the City of Quezon formally commended the QCU team for their sweeping victory at the VEX U National Championship, securing 17th place in the World Skills Standings and proving world-class capability.
   - [Read Quezon City Gov Feature](https://quezoncity.gov.ph/qcu-robotics-team-wins-vex-u-robotics-competition-national-championship-2026-2/)

2. **Quezon City Government Official Announcement (Feb 2, 2026):**
   - *"QCU Robotics Team wins VEX U Robotics Competition National Championship 2026"*
   - Celebrated QCU capturing all 4 major national titles and officially clinching the Philippine delegation slot for the 2026 VEX World Championship in St. Louis, Missouri.
   - [Read Quezon City Gov Bulletin](https://quezoncity.gov.ph/qcu-robotics-team-wins-vex-u-robotics-competition-national-championship-2026/)

3. **Quezon City University Official News (Feb 9, 2026):**
   - *"QCU Dominates VEX U Robotics National Championship, Qualifies for World Stage"*
   - Detailed coverage of QCU's clean sweep of all major awards and achieving **17th place globally** out of 160 international collegiate teams in VEX World Skills.
   - [Read QCU Article](https://qcu.edu.ph/qcu-dominates-vex-u-robotics-national-championship-qualifies-for-world-stage/)

4. **The Philippine Star (Aug 1, 2026):**
   - *"Quezon City University strikes again"* by **CHED Chairman Dr. J. Prospero 'Popoy' De Vera III**
   - Celebrated QCU's historic performance ranking **32nd out of 266 teams worldwide** and **41st in the World Skills Challenge** at the VEX World Championship in America's Center.
   - [Read Philstar Column](https://www.philstar.com/opinion/2026/08/01/2546123/quezon-city-university-strikes-again)

You can explore full photos, badges, and read links in the **Media & Press** section of this portfolio!`;
  }

  if (lower.includes("project") || lower.includes("portfolio") || lower.includes("work") || lower.includes("built") || lower.includes("github") || lower.includes("repo") || lower.includes("cis") || lower.includes("brgy") || lower.includes("resilience")) {
    return `Here are featured projects from John Roi's GitHub ([github.com/Magnaye16](https://github.com/Magnaye16)):

- **VEX Autonomous & Vision Robotics Engine:** Python autonomous routines, vision camera tracking ('camera_skills.py'), and 2v2 alliance strategy that powered QCU to the World Stage ([GitHub Repo](https://github.com/Magnaye16/robotic)).
- **Resilience Quest:** Collaborative disaster risk reduction and community emergency preparedness game built with Godot Engine / GDScript ([GitHub Repo](https://github.com/Erenjhun-uwina/resilence_quest)).
- **Community Information System v4 (CISv4):** Enterprise community profiling, transaction logging, and administrative services platform ([GitHub Repo](https://github.com/Nxvxv/CISv4)).
- **Barangay Management Information System (BrgyS):** Visual Basic .NET local governance software for barangay clearances, resident records, and blotter incidents ([GitHub Repo](https://github.com/Nxvxv/BrgyS)).
- **Student Information Management System (SIMS):** Comprehensive VB.NET desktop academic administration and attendance tracking suite ([GitHub Repo](https://github.com/Magnaye16/SIMS-STUDENT-INFORMATION-MANAGEMENT-SYSTEM)).
- **VEX Tournament Timer (VexTimer):** Desktop tournament timer clock with acoustic buzzer alerts for match and skills training ([GitHub Repo](https://github.com/Magnaye16/VexTimer)).
- **Natural Disaster 3D Simulation:** Physics-based hazard simulation in Godot with custom GLSL shaders ([GitHub Repo](https://github.com/Magnaye16/natural-disaster-3d)).
- **SBIT-3K Super System Portal (SUPERHERO-SYSTEM):** Modular PHP MVC administrative web portal with Composer dependencies ([GitHub Repo](https://github.com/Magnaye16/SUPERHERO-SYSTEM)).

Click on any project in the **Projects** section to inspect the full architecture!`;
  }

  if (lower.includes("skill") || lower.includes("stack") || lower.includes("technolog") || lower.includes("language") || lower.includes("python") || lower.includes("java")) {
    return `John Roi has versatile technical competencies:
- **Programming Languages:** Python, Java, C++, C#, Visual Basic
- **Web Development:** HTML5, CSS3, JavaScript, Modern Web Frameworks
- **Robotics & Hardware:** VEX Robotics Autonomous Systems, Hardware Assembly, Diagnostics & Troubleshooting
- **Software Applications:** Microsoft Office Suite (Excel, Word, PowerPoint), Video Editing
- **Soft Skills:** Active Listening, Critical Thinking, Project & Team Management, High Adaptability`;
  }

  if (lower.includes("experience") || lower.includes("psa") || lower.includes("intern") || lower.includes("driver")) {
    return `John Roi's work and internship experience includes:
- **Philippine Statistics Authority (PSA) - OJT Intern (Sept - Oct 2025):** Assisted in administrative tasks, accurate data encoding, document organization, and official report preparation.
- **Freelance Driver - On-call (Sept 2024 - Present):** Safe client transport, excellent customer service, schedule coordination, and prompt responsiveness across Metro Manila.`;
  }

  return `Hello! I'm **RoiBot**, John Roi Avila Magnaye's AI portfolio assistant. 
I can tell you all about John's **education (BSIT Cum Laude)**, **VEX Robotics World Championship awards**, **projects**, **programming skills**, and **contact information**.

What would you like to explore?
- Ask *"What awards did John win in VEX Robotics?"*
- Ask *"Tell me about John's education and honors"*
- Ask *"What are John Roi's programming skills?"*
- Ask *"How can I contact or hire John?"*`;
}

// API Health Check
app.get("/api/health", (req, res) => {
  const hasKey = Boolean(process.env.GEMINI_API_KEY && process.env.GEMINI_API_KEY !== "MY_GEMINI_API_KEY");
  res.json({
    status: "ok",
    hasGeminiKey: hasKey,
    assistant: "RoiBot Portfolio Assistant",
  });
});

// Chat endpoint
app.post("/api/chat", async (req, res) => {
  try {
    const { messages, message } = req.body;
    
    // Extract recent prompt
    let userPrompt = "";
    if (typeof message === "string" && message.trim()) {
      userPrompt = message.trim();
    } else if (Array.isArray(messages) && messages.length > 0) {
      const lastMsg = messages[messages.length - 1];
      userPrompt = lastMsg.content || lastMsg.text || "";
    }

    if (!userPrompt) {
      res.status(400).json({ error: "Missing prompt or message in request body" });
      return;
    }

    const ai = getGeminiClient();

    if (!ai) {
      // Return smart fallback seamlessly so user experience is always functional
      const fallbackReply = getSmartFallbackResponse(userPrompt);
      res.json({
        reply: fallbackReply,
        mode: "offline_fallback",
        disclaimer: "Running in portfolio assistant mode. Configure GEMINI_API_KEY for live generative answers.",
      });
      return;
    }

    // Build sanitized conversation context: must start with 'user' and alternate roles
    const sanitizedContents: Array<{ role: "user" | "model"; parts: Array<{ text: string }> }> = [];
    let expectedRole: "user" | "model" = "user";

    if (Array.isArray(messages) && messages.length > 1) {
      const historyTurns = messages.slice(-6, -1);
      for (const m of historyTurns) {
        const textContent = (m.content || m.text || "").trim();
        if (!textContent) continue;
        const currentRole = m.role === "assistant" || m.role === "model" ? "model" : "user";
        if (currentRole === expectedRole) {
          sanitizedContents.push({
            role: currentRole,
            parts: [{ text: textContent }],
          });
          expectedRole = expectedRole === "user" ? "model" : "user";
        }
      }
    }

    // Ensure the final turn is the current user prompt
    if (sanitizedContents.length > 0 && sanitizedContents[sanitizedContents.length - 1].role === "user") {
      sanitizedContents.pop();
    }
    sanitizedContents.push({
      role: "user",
      parts: [{ text: userPrompt }],
    });

    // Call Gemini with timeout fallback
    const geminiPromise = ai.models
      .generateContent({
        model: "gemini-3.8-flash",
        contents: sanitizedContents,
        config: {
          systemInstruction: PORTFOLIO_SYSTEM_INSTRUCTION,
          temperature: 0.7,
        },
      })
      .catch((err) => {
        console.warn("Gemini call error/fallback:", err?.message || err);
        return null;
      });

    const timeoutPromise = new Promise<null>((resolve) => {
      setTimeout(() => resolve(null), 2500);
    });

    const response = await Promise.race([geminiPromise, timeoutPromise]);
    const reply = response?.text || getSmartFallbackResponse(userPrompt);

    res.json({
      reply,
      mode: response ? "gemini" : "portfolio_assistant",
    });
  } catch (error: any) {
    console.error("Error in /api/chat:", error);
    // If an error occurs (e.g. rate limit or invalid key), provide smart portfolio fallback gracefully
    const userPrompt = req.body?.message || (Array.isArray(req.body?.messages) ? req.body.messages.slice(-1)[0]?.content : "");
    const fallbackReply = getSmartFallbackResponse(userPrompt || "");
    res.json({
      reply: fallbackReply,
      mode: "offline_fallback",
      error: error?.message || "Internal generation error",
    });
  }
});

async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Portfolio server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
