from pathlib import Path
import shutil

from reportlab.lib.colors import HexColor
from reportlab.lib.pagesizes import letter
from reportlab.pdfbase.pdfmetrics import stringWidth
from reportlab.pdfgen import canvas


ROOT = Path(__file__).resolve().parents[1]
OUTPUT = ROOT / "output" / "pdf" / "ari-swerdlow-resume.pdf"
PUBLIC_COPY = ROOT / "public" / "ari-swerdlow-resume.pdf"

PAGE_W, PAGE_H = letter
INK = HexColor("#18181B")
PAPER = HexColor("#FFFDF7")
PAPER_INK = HexColor("#EFE9DC")
CORAL = HexColor("#E15A46")
COBALT = HexColor("#1E3A8A")
OCHRE = HexColor("#EAB308")
MUTED = HexColor("#5F6068")
WHITE = HexColor("#FFFFFF")


def wrap(text, font, size, width):
    words = text.split()
    lines = []
    current = ""
    for word in words:
        candidate = f"{current} {word}".strip()
        if not current or stringWidth(candidate, font, size) <= width:
            current = candidate
        else:
            lines.append(current)
            current = word
    if current:
        lines.append(current)
    return lines


def paragraph(pdf, text, x, y, width, font="Helvetica", size=8.6, leading=11.5, color=INK):
    pdf.setFillColor(color)
    pdf.setFont(font, size)
    for line in wrap(text, font, size, width):
        pdf.drawString(x, y, line)
        y -= leading
    return y


def label(pdf, text, x, y, color=COBALT):
    pdf.setFillColor(color)
    pdf.setFont("Helvetica-Bold", 7.2)
    pdf.drawString(x, y, text.upper())


def rule(pdf, x1, y, x2, color=INK, width=1.2):
    pdf.setStrokeColor(color)
    pdf.setLineWidth(width)
    pdf.line(x1, y, x2, y)


def metric(pdf, value, caption, x, y, width):
    pdf.setFillColor(PAPER_INK)
    pdf.setStrokeColor(INK)
    pdf.setLineWidth(1)
    pdf.rect(x, y - 34, width, 34, fill=1, stroke=1)
    pdf.setFillColor(INK)
    pdf.setFont("Helvetica-Bold", 15)
    pdf.drawString(x + 8, y - 17, value)
    pdf.setFont("Helvetica", 6.2)
    pdf.setFillColor(MUTED)
    pdf.drawString(x + 8, y - 27, caption.upper())


def project(pdf, title, role, body, evidence, x, y, width, accent):
    pdf.setFillColor(accent)
    pdf.rect(x, y - 10, 4, 10, fill=1, stroke=0)
    pdf.setFillColor(INK)
    pdf.setFont("Helvetica-Bold", 11.2)
    pdf.drawString(x + 10, y - 1, title)
    pdf.setFillColor(MUTED)
    pdf.setFont("Helvetica", 6.7)
    pdf.drawRightString(x + width, y - 1, role.upper())
    y -= 17
    y = paragraph(pdf, body, x + 10, y, width - 10, size=8.1, leading=10.2, color=INK)
    y -= 1
    pdf.setFillColor(accent)
    pdf.setFont("Helvetica-Bold", 6.8)
    pdf.drawString(x + 10, y, evidence.upper())
    return y - 12


def build():
    OUTPUT.parent.mkdir(parents=True, exist_ok=True)
    pdf = canvas.Canvas(str(OUTPUT), pagesize=letter)
    pdf.setTitle("Ari Swerdlow - Product Engineer - Applied Computer Vision")
    pdf.setAuthor("Ari Swerdlow")
    pdf.setSubject("One-page product engineering resume and selected work")

    pdf.setFillColor(PAPER)
    pdf.rect(0, 0, PAGE_W, PAGE_H, fill=1, stroke=0)

    # Header
    pdf.setFillColor(INK)
    pdf.rect(0, PAGE_H - 120, PAGE_W, 120, fill=1, stroke=0)
    pdf.setFillColor(CORAL)
    pdf.rect(36, PAGE_H - 70, 38, 38, fill=1, stroke=0)
    pdf.setFillColor(WHITE)
    pdf.setFont("Helvetica-Bold", 15)
    pdf.drawCentredString(55, PAGE_H - 57, "AS")

    pdf.setFillColor(WHITE)
    pdf.setFont("Helvetica-Bold", 30)
    pdf.drawString(88, PAGE_H - 53, "ARI SWERDLOW")
    pdf.setFillColor(OCHRE)
    pdf.setFont("Helvetica-Bold", 11)
    pdf.drawString(89, PAGE_H - 73, "PRODUCT ENGINEER  /  APPLIED COMPUTER VISION")
    pdf.setFillColor(HexColor("#D4D4D8"))
    pdf.setFont("Helvetica", 8)
    pdf.drawString(89, PAGE_H - 92, "Browser products where movement becomes input - built for noisy signals, real devices, and clear recovery.")

    # Contact strip
    contact_y = PAGE_H - 108
    pdf.setFont("Helvetica", 7.2)
    pdf.setFillColor(WHITE)
    contacts = [
        ("aswerd2@gmail.com", "mailto:aswerd2@gmail.com"),
        ("ari-swerdlow.vercel.app", "https://ari-swerdlow.vercel.app"),
        ("github.com/lw300579-sys", "https://github.com/lw300579-sys"),
    ]
    x = 36
    for index, (text, url) in enumerate(contacts):
        pdf.drawString(x, contact_y, text)
        w = stringWidth(text, "Helvetica", 7.2)
        pdf.linkURL(url, (x, contact_y - 2, x + w, contact_y + 8), relative=0)
        x += w + 18
        if index < len(contacts) - 1:
            pdf.setFillColor(CORAL)
            pdf.circle(x - 9, contact_y + 3, 1.7, fill=1, stroke=0)
            pdf.setFillColor(WHITE)

    left_x = 36
    left_w = 152
    gutter = 22
    right_x = left_x + left_w + gutter
    right_w = PAGE_W - right_x - 36
    top = PAGE_H - 148

    # Left rail
    label(pdf, "Profile", left_x, top)
    y = top - 15
    y = paragraph(
        pdf,
        "Independent product engineer working across computer vision, interaction design, game systems, and release reliability. I turn uncertain camera input into sessions people can understand and recover.",
        left_x,
        y,
        left_w,
        size=8.2,
        leading=11,
    )
    y -= 12
    rule(pdf, left_x, y, left_x + left_w, color=CORAL, width=2)
    y -= 20

    label(pdf, "Core strengths", left_x, y)
    y -= 16
    strengths = [
        "Computer vision product UX",
        "Browser AR and camera pipelines",
        "Finite-state game systems",
        "Simulation and recorded replay",
        "On-device performance budgets",
        "Accessibility and recovery design",
        "Release gates and observability",
    ]
    for item in strengths:
        pdf.setFillColor(COBALT)
        pdf.rect(left_x, y - 2, 4, 4, fill=1, stroke=0)
        pdf.setFillColor(INK)
        pdf.setFont("Helvetica", 7.8)
        pdf.drawString(left_x + 10, y - 3, item)
        y -= 15

    y -= 4
    label(pdf, "Technology", left_x, y)
    y -= 16
    y = paragraph(
        pdf,
        "TypeScript, React, Next.js, Three.js, React Three Fiber, MediaPipe, TensorFlow.js, WebGL, Python, FastAPI, Playwright, deterministic simulation",
        left_x,
        y,
        left_w,
        size=7.8,
        leading=10.5,
        color=INK,
    )
    y -= 10

    label(pdf, "Working principles", left_x, y)
    y -= 16
    principles = [
        ("Uncertainty stays visible", "Low-confidence input pauses or downgrades a judgment."),
        ("Recovery is product state", "Permission, tracking loss, and interruption get explicit paths."),
        ("Evidence has boundaries", "Engineering checks are never relabeled as user outcomes."),
    ]
    for title, body in principles:
        pdf.setFont("Helvetica-Bold", 7.8)
        pdf.setFillColor(INK)
        pdf.drawString(left_x, y, title)
        y -= 10
        y = paragraph(pdf, body, left_x, y, left_w, size=7.2, leading=9.2, color=MUTED)
        y -= 7

    y -= 3
    pdf.setFillColor(PAPER_INK)
    pdf.setStrokeColor(INK)
    pdf.setLineWidth(1)
    pdf.rect(left_x, y - 70, left_w, 70, fill=1, stroke=1)
    label(pdf, "Current focus", left_x + 10, y - 16, color=CORAL)
    paragraph(
        pdf,
        "Available for product engineering and applied computer vision work where software must understand the physical world.",
        left_x + 10,
        y - 31,
        left_w - 20,
        size=7.5,
        leading=9.8,
    )

    # Main column
    label(pdf, "Selected product work  /  2025-2026", right_x, top, color=CORAL)
    y = top - 18
    y = project(
        pdf,
        "Jiku Fitness",
        "Product + engineering",
        "Built a browser training loop for boxing, push-ups, and pull-ups around explicit play, rest, completion, results, confidence, and tracking-loss states.",
        "84% target occupancy across 347 recorded-replay samples  /  8 deterministic boxing tests",
        right_x,
        y,
        right_w,
        CORAL,
    )
    y -= 4
    y = project(
        pdf,
        "AR Baseball",
        "Game + pose systems",
        "Built a camera-controlled three-inning baseball game with readiness calibration, fresh-frame swing recognition, fielding, runners, rival scoring, and bounded completion.",
        "250k seeded simulations  /  recorded-camera production gate  /  complete three-inning loop",
        right_x,
        y,
        right_w,
        OCHRE,
    )
    y -= 4
    y = project(
        pdf,
        "Bio-Tactical Edge",
        "Research + product architecture",
        "Designed a sports-intelligence workspace linking broadcast video, court calibration, player paths, synchronized 3D replay, counterfactual recovery, search, and report evidence.",
        "77 automated tests  /  public source-linked golden rally remains the next acceptance artifact",
        right_x,
        y,
        right_w,
        COBALT,
    )

    y -= 2
    rule(pdf, right_x, y, right_x + right_w, color=COBALT, width=2)
    y -= 18
    label(pdf, "Additional systems shipped", right_x, y, color=COBALT)
    y -= 16
    additional = [
        ("Jiku Tennis", "body-tracked rallies and five-rival progression", "33 tests"),
        ("Form: Pickleball", "pose, ball, and audio coaching workflows", "695 tests"),
        ("ASL Hero", "self-hosted hand tracking and learned fallback", "decision-path tests"),
        ("AR Slicer", "independent camera layer and thermal-aware quality", "recovery gate"),
        ("Orbitap", "seeded courses and shareable ghost runs", "PWA build"),
    ]
    for name, description, proof in additional:
        pdf.setFillColor(INK)
        pdf.setFont("Helvetica-Bold", 7.8)
        pdf.drawString(right_x, y, name)
        pdf.setFont("Helvetica", 7.2)
        pdf.setFillColor(MUTED)
        pdf.drawString(right_x + 78, y, description)
        pdf.setFont("Helvetica-Bold", 6.7)
        pdf.setFillColor(COBALT)
        pdf.drawRightString(right_x + right_w, y, proof.upper())
        y -= 14

    y -= 4
    label(pdf, "Engineering validation snapshot", right_x, y, color=CORAL)
    y -= 12
    metric_w = (right_w - 12) / 3
    metric(pdf, "250k", "baseball simulations", right_x, y, metric_w)
    metric(pdf, "695", "coach tests", right_x + metric_w + 6, y, metric_w)
    metric(pdf, "5", "camera products", right_x + (metric_w + 6) * 2, y, metric_w)

    team_y = y - 58
    label(pdf, "What I can do for your team", right_x, team_y, color=COBALT)
    card_y = team_y - 12
    card_w = (right_w - 12) / 3
    capabilities = [
        (
            "Prototype the hard input",
            "Turn gesture, pose, video, or physical motion into a legible interaction loop.",
        ),
        (
            "Make it trustworthy",
            "Design confidence, failure, privacy, and recovery as product states rather than edge cases.",
        ),
        (
            "Ship with evidence",
            "Use replay, simulation, browser gates, and honest metrics to protect the complete journey.",
        ),
    ]
    for index, (title, body) in enumerate(capabilities):
        card_x = right_x + index * (card_w + 6)
        pdf.setFillColor(WHITE)
        pdf.setStrokeColor(INK)
        pdf.setLineWidth(1)
        pdf.rect(card_x, card_y - 80, card_w, 80, fill=1, stroke=1)
        pdf.setFillColor([CORAL, OCHRE, COBALT][index])
        pdf.rect(card_x, card_y - 5, card_w, 5, fill=1, stroke=0)
        pdf.setFillColor(INK)
        pdf.setFont("Helvetica-Bold", 8.2)
        pdf.drawString(card_x + 8, card_y - 22, title)
        paragraph(pdf, body, card_x + 8, card_y - 37, card_w - 16, size=6.8, leading=8.8, color=MUTED)

    availability_y = card_y - 96
    pdf.setFillColor(INK)
    pdf.rect(right_x, availability_y - 47, right_w, 47, fill=1, stroke=0)
    pdf.setFillColor(OCHRE)
    pdf.setFont("Helvetica-Bold", 7)
    pdf.drawString(right_x + 12, availability_y - 16, "AVAILABLE NOW")
    pdf.setFillColor(WHITE)
    pdf.setFont("Helvetica-Bold", 10)
    pdf.drawString(right_x + 12, availability_y - 33, "Product engineering  /  Applied CV  /  Interaction systems")

    # Footer
    footer_y = 31
    rule(pdf, 36, footer_y + 15, PAGE_W - 36, color=INK, width=1)
    pdf.setFillColor(MUTED)
    pdf.setFont("Helvetica", 6.5)
    pdf.drawString(36, footer_y, "Engineering metrics, not user-outcome claims. Methods and open evidence gaps: ari-swerdlow.vercel.app/evidence")
    pdf.setFillColor(CORAL)
    pdf.setFont("Helvetica-Bold", 7)
    pdf.drawRightString(PAGE_W - 36, footer_y, "AVAILABLE FOR PRODUCT ENGINEERING + APPLIED CV")

    pdf.showPage()
    pdf.save()
    shutil.copyfile(OUTPUT, PUBLIC_COPY)


if __name__ == "__main__":
    build()
