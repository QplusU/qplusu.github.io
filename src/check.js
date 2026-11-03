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
    1: { label: 'Worth watching', text: 'No rule names your sector yet, but the standards your vendors and auditors follow are changing.' },
    2: { label: 'Likely affected', text: 'Your sector most likely faces post-quantum expectations within the next few years.' },
    3: { label: 'Most likely affected', text: 'Your organization most likely has a post-quantum deadline already on the way.' }
  };

  var DATA = {
    short: { label: 'Under 2 years', level: 1, text: 'Your data loses value quickly, so stolen-today risk is lower. The regulation clock and your vendors are the main reasons to plan.' },
    mid:   { label: '2 to 5 years', level: 2, text: 'Data stolen today must stay private until about 2031. Attackers who record it now are betting on a quantum computer arriving within that window.' },
    long:  { label: '5 to 10 years', level: 3, text: 'Data stolen today must stay private until as late as 2036. Experts surveyed by the Global Risk Institute put the chance of a code-breaking quantum computer within 10 years at 28–49%.' },
    xlong: { label: '10+ years', level: 3, text: 'Data stolen today must stay private past 2036. The same experts put the chance of a code-breaking quantum computer within 15 years at 51–70%. This data is exposed now.' }
  };
  var DATA_SRC = { src: 'Global Risk Institute, Quantum Threat Timeline Report (March 2026)', url: 'https://globalriskinstitute.org/publication/quantum-threat-timeline-report-2025b/' };

  var state = { sector: null, flags: {}, data: null };
  var out = document.getElementById('check-result');
  var form = document.getElementById('check-form');

  function pick(group, value, btn) {
    if (group === 'flags') {
      state.flags[value] = !state.flags[value];
      btn.setAttribute('aria-pressed', state.flags[value] ? 'true' : 'false');
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

  function render() {
    if (!state.sector || !state.data) {
      out.hidden = true; form.hidden = true;
      return;
    }
    var r = compute(), lv = LEVELS[r.level], d = DATA[state.data];
    var html = '';
    html += '<div class="verdict lv' + r.level + '"><span class="tag">Regulation clock</span><h3>' + esc(lv.label) + '</h3><p>' + esc(lv.text) + '</p></div>';
    html += '<ul class="rules">';
    r.ids.forEach(function (id) {
      var x = RULES[id];
      html += '<li><div class="rtop"><b>' + esc(x.title) + '</b><span class="status">' + esc(x.status) + '</span></div>' +
        '<p class="fine when">' + esc(x.date) + '</p><p>' + esc(x.text) + '</p>' +
        '<a class="fine src" href="' + esc(x.url) + '" rel="noopener" target="_blank">Source: ' + esc(x.src) + '</a></li>';
    });
    html += '</ul>';
    html += '<div class="verdict lv' + d.level + '"><span class="tag">Attacker clock · harvest now, decrypt later</span><h3>' + (d.level >= 3 ? 'Exposed today' : d.level === 2 ? 'Some exposure today' : 'Lower exposure today') + '</h3><p>' + esc(d.text) + '</p><a class="fine src" href="' + DATA_SRC.url + '" rel="noopener" target="_blank">Source: ' + esc(DATA_SRC.src) + '</a></div>';
    var cta = (r.level >= 2 || d.level >= 3)
      ? 'This most likely applies to you. Tell us about your business and we’ll follow up with what it means for you.'
      : 'Even without a rule today, it’s worth knowing where you stand. Tell us about your business, or get the playbook.';
    html += '<p class="cta-line">' + esc(cta) + '</p>';
    html += '<p class="fine">A starting point, not legal advice. Rules as of November 2026. Confirm what applies with your counsel.</p>';
    out.innerHTML = html;
    out.hidden = false; form.hidden = false;
  }

  // Preselect from the URL, e.g. ?sector=fin&flags=cards,eu&data=xlong (handy for links sent to prospects)
  (function () {
    var q = new URLSearchParams(location.search);
    function press(group, v) { var b = root.querySelector('[data-group="' + group + '"] button[data-value="' + v + '"]'); if (b) b.click(); }
    if (q.get('sector')) press('sector', q.get('sector'));
    (q.get('flags') || '').split(',').filter(Boolean).forEach(function (v) { press('flags', v); });
    if (q.get('data')) press('data', q.get('data'));
  })();

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var r = compute(), fd = new FormData(form);
    var flags = Object.keys(state.flags).filter(function (k) { return state.flags[k]; }).join(', ') || 'none';
    var body = 'Readiness check\n\nCompany: ' + (fd.get('company') || '') + '\nSize: ' + (fd.get('size') || '') + '\nEmail: ' + (fd.get('email') || '') +
      '\n\nSector: ' + SECTORS[state.sector].label + '\nAlso applies: ' + flags + '\nData must stay private: ' + DATA[state.data].label +
      '\nResult: ' + LEVELS[r.level].label + '\nRules shown: ' + r.ids.map(function (id) { return RULES[id].title; }).join('; ') +
      '\n\nAnything else: ' + (fd.get('note') || '');
    location.href = 'mailto:info@qplusu.com?subject=' + encodeURIComponent('Readiness check: ' + (fd.get('company') || 'my business')) + '&body=' + encodeURIComponent(body);
  });
})();
