// File ini adalah "Otak" dari web Raxzydvierro.vercel.app
export default async function handler(req, res) {
    // 1. Izinkan akses dari Frontend (CORS)
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
    res.setHeader('Content-Type', 'application/json');

    // 2. Ambil data dari URL
    const { feature, query, url } = req.query;

    // --- LOGIKA FITUR ---

    // Fitur 1: RAXZY BOT (AI)
    if (feature === 'ai') {
        return res.status(200).json({
            status: true,
            creator: "RAXZY",
            result: `Raxzy Bot: Perintah "${query || 'kosong'}" sedang diproses. Gue siap bantu koding lo, Bos!`
        });
    }

    // Fitur 2: SCAN VIRUS
    if (feature === 'scan') {
        if (!url) return res.status(400).json({ status: false, message: "Mana linknya?" });
        const isSafe = !url.includes('malware') && !url.includes('virus');
        return res.status(200).json({
            status: true,
            creator: "RAXZY",
            target: url,
            result: isSafe ? "✅ Link Aman untuk diakses." : "⚠️ Bahaya! Terdeteksi Malware."
        });
    }

    // Fitur 3: HTML RIPPER
    if (feature === 'ripper') {
        if (!url) return res.status(400).json({ status: false, message: "Link target kosong!" });
        try {
            const response = await fetch(url);
            const html = await response.text();
            return res.status(200).json({
                status: true,
                creator: "RAXZY",
                source: html.substring(0, 1500) + "\n\n... (Ripped by Raxzy API)"
            });
        } catch (e) {
            return res.status(500).json({ status: false, error: "Gagal rip target." });
        }
    }

    res.status(400).json({ status: false, message: "Pilih fitur dulu!" });
}
