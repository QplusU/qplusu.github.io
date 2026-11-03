/* "Am I affected?" readiness check.
   Rules as of November 2026. Each item carries its status and a source.
   Results are framed as "most likely" because this is a starting point, not legal advice. */
(function () {
  var root = document.getElementById('check');
  if (!root) return;

  var RULES = {
    far: {
      title: 'Federal contractor rule (FAR)',
      status: 'Coming',
      date: 'Proposed rule due Dec 2026 · compliance by Dec 31, 2030',
      text: 'Executive Order 14412 directs the FAR Council to require covered contractors to meet NIST standards that include post-quantum algorithms by the end of 2030.',
      src: 'Executive Order 14412, Sec. 6(c)',
      url: 'https://www.whitehouse.gov/presidential-actions/2026/06/securing-the-nation-against-advanced-cryptographic-attacks/'
    },
    cnsa: {
      title: 'CNSA 2.0 for national security systems',
      status: 'In effect from Jan 2027',
      date: 'New NSS acquisitions from Jan 1, 2027',
      text: 'If your products or services reach national security systems, new acquisitions must support the NSA’s quantum-resistant algorithm suite from 2027, with full use required by 2030 to 2033 depending on the system.',
      src: 'NSA CNSA 2.0 timeline (summary)',
      url: 'https://postquantum.com/cnsa-2-0/complete-guide/'
    },
    dow: {
      title: 'Defense industrial base',
      status: 'Planned',
      date: 'Department of War strategy, June 2026',
      text: 'The Department of War plans to extend post-quantum requirements across the defense industrial base, including future CMMC requirements. Not yet in force.',
      src: 'DefenseScoop, July 2026',
      url: 'https://defensescoop.com/2026/07/10/cmmc-pqc-requirements-defense-contractors-cybersecurity/'
    },
    pci: {
      title: 'PCI DSS v4',
      status: 'In force',
      date: 'Mandatory since Mar 31, 2025',
      text: 'If you handle card data, you must keep an inventory of the cipher suites and protocols you use, review it every 12 months, and plan for anticipated changes in cryptographic vulnerabilities. The standard doesn’t name quantum, but this is the inventory a migration starts from.',
      src: 'PCI DSS v4 Req. 12.3.3 (summary)',
      url: 'https://postquantum.com/security-pqc/pci-dss-v4-quantum-cryptographic-requirements/'
    },
    g7: {
      title: 'G7 financial sector roadmap',
      status: 'Guidance',
      date: 'Critical systems 2030–2032 · sector around 2035',
      text: 'The G7 Cyber Expert Group, which includes the US Treasury, suggests moving critical financial systems to post-quantum cryptography by 2030 to 2032 and the whole sector around 2035. Non-binding, but it signals where regulators are heading.',
      src: 'G7 Cyber Expert Group, January 2026',
      url: 'https://home.treasury.gov/system/files/136/G7-CEG-Quantum-Roadmap.pdf'
    },
    nydfs: {
      title: 'NYDFS Part 500 (New York)',
      status: 'In force',
      date: 'Part 500 amendments fully phased in, Nov 2025',
      text: 'New York-regulated financial firms must encrypt nonpublic information in transit and at rest. Part 500 doesn’t require post-quantum algorithms today. Worth watching as NIST’s 2030 deprecation date approaches.',
      src: '23 NYCRR 500.15 (summary)',
      url: 'https://www.keyfactor.com/blog/nydfs-part-500-cryptography-what-covered-entities-must-prove-now/'
    },
    hipaa: {
      title: 'HIPAA Security Rule update',
      status: 'Proposed',
      date: 'Final rule targeted around mid-2027',
      text: 'The proposed update would make encryption of electronic health information mandatory, at rest and in transit, and require annual technology asset inventories. It is not final yet.',
      src: 'Status as of September 2026',
      url: 'https://www.pact-one.com/2026/09/hipaa-security-rule-2026-status/'
    },
    aspr: {
      title: 'HHS guidance for hospitals',
      status: 'Coming',
      date: 'Announced September 2026',
      text: 'HHS’s ASPR has said it is about to release post-quantum migration guidance for hospitals and public health organizations, and suggests inventorying data and systems now.',
      src: 'GovCIO Media, September 2026',
      url: 'https://govciomedia.com/aspr-signals-new-quantum-guidance-amid-health-cyber-threats/'
    },
    ci: {
      title: 'Critical infrastructure support',
      status: 'Guidance',
      date: 'Executive Order 14412, June 2026',
      text: 'Sector agencies and CISA are directed to help critical infrastructure owners and operators build post-quantum migration plans. Support, not yet a mandate.',
      src: 'Executive Order 14412, Sec. 5(a)',
      url: 'https://www.whitehouse.gov/presidential-actions/2026/06/securing-the-nation-against-advanced-cryptographic-attacks/'
    },
    grid: {
      title: 'Quantum-GUARD Act (electric grid)',
      status: 'Proposed',
      date: 'Introduced August 2026',
      text: 'A bipartisan Senate bill would have FERC weigh quantum risk in grid reliability and fund a DOE testbed for post-quantum adoption. Introduced only.',
      src: 'The Quantum Insider, August 2026',
      url: 'https://thequantuminsider.com/2026/08/18/bipartisan-bill-quantum-cybersecurity-risks-electric-grid/'
    },
    eu: {
      title: 'EU post-quantum roadmap',
      status: 'Guidance',
      date: 'Start by end of 2026 · high-risk by 2030',
      text: 'EU member states agreed to begin the transition by the end of 2026 and move high-risk use cases by the end of 2030.',
      src: 'European Commission',
      url: 'https://digital-strategy.ec.europa.eu/en/policies/post-quantum-cryptography'
    },
    dora: {
      title: 'DORA (EU financial entities)',
      status: 'In force',
      date: 'Applies since Jan 2025',
      text: 'EU financial entities must keep a cryptography policy that updates their cryptography based on developments in cryptanalysis, and mitigate where they can’t.',
      src: 'Delegated Regulation (EU) 2024/1774, Art. 6',
      url: 'https://www.springlex.eu/en/packages/dora/rts-rmf-regulation/article-6/'
    },
    nist: {
      title: 'NIST IR 8547',
      status: 'Final standard',
      date: 'Deprecated after 2030 · disallowed after 2035',
      text: 'NIST finalized its transition plan on October 27, 2026: RSA and ECC are deprecated after 2030 and disallowed after 2035. Vendors and auditors build to NIST, so this reaches most organizations eventually.',
      src: 'Cloud Security Alliance research note, Oct 2026',
      url: 'https://labs.cloudsecurityalliance.org/research/csa-research-note-nist-ir8547-pqc-transition-20261030-csa-st/'
    },
    msp: {
      title: 'Your clients’ obligations',
      status: 'Through clients',
      date: 'As your clients’ deadlines land',
      text: 'There is no MSP-specific rule yet, but contractors, banks and health clients will need providers who can inventory and migrate their encryption. Their deadlines become your service requests.',
      src: 'Executive Order 14412 and sector guidance above',
      url: 'https://www.whitehouse.gov/presidential-actions/2026/06/securing-the-nation-against-advanced-cryptographic-attacks/'
    }
  };

  var SECTORS = {
    fin:   { label: 'Financial services', level: 2, rules: ['g7', 'nydfs', 'ci'] },
    health:{ label: 'Healthcare', level: 2, rules: ['hipaa', 'aspr', 'ci'] },
    gov:   { label: 'Government contractor', level: 3, rules: ['far', 'cnsa', 'dow'] },
    energy:{ label: 'Energy and utilities', level: 2, rules: ['ci', 'grid'] },
    msp:   { label: 'MSP or IT provider', level: 2, rules: ['msp'] },
    other: { label: 'Other', level: 1, rules: [] }
  };

  var LEVELS = {
    1: { label: 'Worth watching', short: 'No rule names your sector yet, but the standards are shifting.', text: 'No rule names your sector yet, but the standards your vendors and auditors follow are changing.' },
    2: { label: 'Likely affected', short: 'Expect requirements within the next few years.', text: 'Your sector most likely faces post-quantum expectations within the next few years.' },
    3: { label: 'Most likely affected', short: 'A deadline is most likely already on its way.', text: 'Your organization most likely has a post-quantum deadline already on the way.' }
  };

  // What data they hold, mapped to how long it stays sensitive. The longest-lived type picked drives the attacker clock.
  var Q10 = 'Quantum computers could break today\u2019s encryption as soon as 2030. Gartner says it will be unsafe by 2029.';
  var Q15 = Q10;
  var DATA = {
    health: { rank: 4, level: 3, label: 'Health or medical records', life: 'stay sensitive for decades', q: Q15 },
    ip:     { rank: 4, level: 3, label: 'Contracts, IP or trade secrets', life: 'stay sensitive for 10+ years', q: Q15 },
    fin:    { rank: 3, level: 3, label: 'Financial or account data', life: 'stays sensitive for 7+ years', q: Q10 },
    pii:    { rank: 2, level: 3, label: 'Customer personal information', life: 'stays sensitive for 5 to 10 years', q: Q10 },
    short:  { rank: 1, level: 1, label: 'Mostly short-lived data', life: 'loses value quickly', q: 'Stolen-today risk is lower, so the regulation clock and your vendors are the main reasons to plan.' }
  };
  var DATA_SRC = { src: 'Gartner', url: 'https://gcom.pdo.aws.gartner.com/en/articles/post-quantum-cryptography' };

  var state = { sector: null, flags: {}, data: {} };
  var out = document.getElementById('check-result');
  var form = document.getElementById('check-form');

  function pick(group, value, btn) {
    if (group === 'flags' || group === 'data') {
      state[group][value] = !state[group][value];
      btn.setAttribute('aria-pressed', state[group][value] ? 'true' : 'false');
    } else {
      state[group] = value;
      root.querySelectorAll('[data-group="' + group + '"] button').forEach(function (b) {
        b.setAttribute('aria-pressed', b === btn ? 'true' : 'false');
      });
    }
    render();
  }

  root.querySelectorAll('[data-group] button').forEach(function (b) {
    b.addEventListener('click', function () { pick(b.parentNode.getAttribute('data-group'), b.getAttribute('data-value'), b); });
  });

  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }

  function compute() {
    var s = SECTORS[state.sector];
    var level = s.level, ids = s.rules.slice();
    function add(id) { if (ids.indexOf(id) < 0) ids.push(id); }
    if (state.flags.fed) { level = 3; ['far', 'cnsa'].forEach(add); }
    if (state.flags.cards) { level = Math.max(level, 2); add('pci'); }
    if (state.flags.ci) { level = Math.max(level, 2); add('ci'); }
    if (state.flags.eu) { level = Math.max(level, 2); add('eu'); if (state.sector === 'fin') add('dora'); }
    add('nist');
    return { level: level, ids: ids };
  }

  function picked(obj) { return Object.keys(obj).filter(function (k) { return obj[k]; }); }
  function topData() {
    var best = null;
    picked(state.data).forEach(function (k) { if (!best || DATA[k].rank > DATA[best].rank) best = k; });
    return best;
  }

  function render() {
    if (!state.sector || !topData()) {
      out.hidden = true; form.hidden = true;
      return;
    }
    var r = compute(), lv = LEVELS[r.level], d = DATA[topData()];
    var html = '<div class="clocks">' +
      '<div class="verdict lv' + r.level + '"><span class="tag">Regulation clock</span><h3>' + esc(lv.label) + '</h3><p>' + esc(lv.short) + '</p></div>' +
      '<div class="verdict lv' + d.level + '"><span class="tag">Attacker clock</span><h3>' + (d.level >= 3 ? 'Exposed today' : 'Lower exposure') + '</h3><p>' + esc(d.label + ' ' + d.life + '. ' + d.q) + ' <a class="src" href="' + DATA_SRC.url + '" rel="noopener" target="_blank">Source</a></p></div>' +
      '</div>';
    html += '<p class="qlabel">What applies to you <span class="opt">Tap for details</span></p><div class="rules">';
    r.ids.forEach(function (id) {
      var x = RULES[id];
      html += '<details><summary><b>' + esc(x.title) + '</b><span class="status">' + esc(x.status) + '</span></summary>' +
        '<p><span class="when">' + esc(x.date) + '.</span> ' + esc(x.text) + ' <a class="src" href="' + esc(x.url) + '" rel="noopener" target="_blank">Source</a></p></details>';
    });
    html += '</div>';
    html += '<details class="sample"><summary>See a sample migration plan</summary>' +
      '<p class="fine">For a simulated mid-size firm. Each step has a reason, and the timing follows the business.</p>' +
      '<table class="plan"><thead><tr><th>Week</th><th>System</th><th>Action</th><th>Why</th></tr></thead><tbody>' +
      '<tr><td>1\u20132</td><td>Customer VPN</td><td>Hybrid ML-KEM</td><td>Internet-facing; secret 10+ years</td></tr>' +
      '<tr><td>3</td><td>Payroll transfer</td><td>Hybrid key exchange</td><td>Regulated data; vendor ready</td></tr>' +
      '<tr><td>4</td><td>None</td><td>Change freeze</td><td>Quarter close on calendar</td></tr>' +
      '<tr><td>5</td><td>Internal wiki</td><td>Swap at renewal</td><td>Low exposure; batch it</td></tr>' +
      '<tr><td>7</td><td>Partner EDI link</td><td>Hold</td><td>Vendor not ready; flagged</td></tr>' +
      '</tbody></table></details>';
    out.innerHTML = html;
    out.hidden = false; form.hidden = false;
  }

  // Preselect from the URL, e.g. ?sector=fin&flags=cards,eu&data=xlong (handy for links sent to prospects)
  (function () {
    var q = new URLSearchParams(location.search);
    function press(group, v) { var b = root.querySelector('[data-group="' + group + '"] button[data-value="' + v + '"]'); if (b) b.click(); }
    if (q.get('sector')) press('sector', q.get('sector'));
    (q.get('flags') || '').split(',').filter(Boolean).forEach(function (v) { press('flags', v); });
    (q.get('data') || '').split(',').filter(Boolean).forEach(function (v) { press('data', v); });
  })();

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var r = compute(), fd = new FormData(form);
    var flags = Object.keys(state.flags).filter(function (k) { return state.flags[k]; }).join(', ') || 'none';
    var body = 'Readiness check\n\nCompany: ' + (fd.get('company') || '') + '\nEmail: ' + (fd.get('email') || '') +
      '\n\nSector: ' + SECTORS[state.sector].label + '\nAlso applies: ' + flags + '\nData held: ' + (picked(state.data).map(function (k) { return DATA[k].label; }).join(', ') || 'not given') +
      '\nResult: ' + LEVELS[r.level].label + '\nRules shown: ' + r.ids.map(function (id) { return RULES[id].title; }).join('; ') ;
    location.href = 'mailto:info@qplusu.com?subject=' + encodeURIComponent('Readiness check: ' + (fd.get('company') || 'my business')) + '&body=' + encodeURIComponent(body);
  });
})();
