export const industryBenchmarks = {
    financial: {
      svc: { avg: 75, top25: 85, top10: 92 },
      eai: { avg: 82, top25: 90, top10: 95 },
      cim: { avg: 70, top25: 80, top10: 88 },
      rsm: { avg: 78, top25: 85, top10: 92 },
      wei: { avg: 72, top25: 82, top10: 90 }
    },
    healthcare: {
      svc: { avg: 80, top25: 88, top10: 94 },
      eai: { avg: 85, top25: 92, top10: 96 },
      cim: { avg: 78, top25: 85, top10: 92 },
      rsm: { avg: 72, top25: 82, top10: 88 },
      wei: { avg: 75, top25: 85, top10: 90 }
    },
    manufacturing: {
      svc: { avg: 70, top25: 80, top10: 88 },
      eai: { avg: 75, top25: 85, top10: 90 },
      cim: { avg: 72, top25: 82, top10: 88 },
      rsm: { avg: 80, top25: 88, top10: 94 },
      wei: { avg: 82, top25: 90, top10: 95 }
    },
    technology: {
      svc: { avg: 78, top25: 85, top10: 92 },
      eai: { avg: 80, top25: 88, top10: 94 },
      cim: { avg: 75, top25: 85, top10: 90 },
      rsm: { avg: 85, top25: 92, top10: 96 },
      wei: { avg: 80, top25: 88, top10: 94 }
    }
  };
  
  export const industryRecommendations = {
    financial: {
      svc: [
        "Enhance financial inclusion initiatives",
        "Develop community financial literacy programs",
        "Implement impact measurement frameworks"
      ],
      eai: [
        "Strengthen algorithmic fairness in lending",
        "Enhance privacy protection measures",
        "Implement transparent decision-making systems"
      ]
      // ... continue for other dimensions
    },
    healthcare: {
      svc: [
        "Improve patient access programs",
        "Develop community health initiatives",
        "Implement outcome measurement systems"
      ],
      eai: [
        "Enhance patient data protection",
        "Improve diagnostic accuracy transparency",
        "Implement ethical AI guidelines for healthcare"
      ]
      // ... continue for other dimensions
    }
    // ... continue for other industries
  };