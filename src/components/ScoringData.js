// Defines scoring criteria for each dimension of the SAVF framework
export const dimensionCategories = {
  svc: [
    {
      name: "Direct Impact",
      maxPoints: 40,
      options: [
        { value: "40", label: "Transformative community benefit with measurable outcomes" },
        { value: "30", label: "Significant positive impact across multiple metrics" },
        { value: "20", label: "Moderate positive impact" },
        { value: "10", label: "Minimal measurable impact" }
      ]
    },
    {
      name: "Cultural Sensitivity",
      maxPoints: 30,
      options: [
        { value: "30", label: "Comprehensive cultural adaptation" },
        { value: "20", label: "Strong cultural consideration" },
        { value: "10", label: "Basic cultural awareness" },
        { value: "5", label: "Minimal cultural consideration" }
      ]
    },
    {
      name: "Social Impact Measurement",
      maxPoints: 30,
      options: [
        { value: "30", label: "Comprehensive impact data collection" },
        { value: "20", label: "Strong metrics framework" },
        { value: "10", label: "Basic measurement system" },
        { value: "5", label: "Limited metrics" }
      ]
    }
  ],
  eai: [
    {
      name: "Bias Mitigation",
      maxPoints: 35,
      options: [
        { value: "35", label: "Comprehensive bias detection and correction" },
        { value: "25", label: "Regular bias audits" },
        { value: "15", label: "Basic bias checking" },
        { value: "5", label: "Minimal bias consideration" }
      ]
    },
    {
      name: "Transparency Requirements",
      maxPoints: 35,
      options: [
        { value: "35", label: "Full algorithmic transparency" },
        { value: "25", label: "Clear decision documentation" },
        { value: "15", label: "Basic explanation system" },
        { value: "5", label: "Limited transparency" }
      ]
    },
    {
      name: "Privacy Protection",
      maxPoints: 30,
      options: [
        { value: "30", label: "Advanced security measures" },
        { value: "20", label: "Strong security framework" },
        { value: "10", label: "Basic security" },
        { value: "5", label: "Minimal security" }
      ]
    }
  ],
  cim: [
    {
      name: "Local Economic Impact",
      maxPoints: 40,
      options: [
        { value: "40", label: "Significant positive job creation/transformation" },
        { value: "30", label: "Moderate positive job impact" },
        { value: "20", label: "Neutral job impact" },
        { value: "10", label: "Limited consideration of job impact" }
      ]
    },
    {
      name: "Social Cohesion",
      maxPoints: 30,
      options: [
        { value: "30", label: "Deep, ongoing community involvement" },
        { value: "20", label: "Regular community interaction" },
        { value: "10", label: "Basic community engagement" },
        { value: "5", label: "Minimal community involvement" }
      ]
    },
    {
      name: "Community Infrastructure",
      maxPoints: 30,
      options: [
        { value: "30", label: "Significant infrastructure enhancement" },
        { value: "20", label: "Moderate infrastructure improvement" },
        { value: "10", label: "Basic infrastructure consideration" },
        { value: "5", label: "Minimal infrastructure impact" }
      ]
    }
  ],
  rsm: [
    {
      name: "Resource Efficiency",
      maxPoints: 35,
      options: [
        { value: "35", label: "Optimal resource utilization" },
        { value: "25", label: "Good efficiency measures" },
        { value: "15", label: "Basic efficiency consideration" },
        { value: "5", label: "Limited efficiency measures" }
      ]
    },
    {
      name: "Scalability Assessment",
      maxPoints: 35,
      options: [
        { value: "35", label: "Highly scalable architecture" },
        { value: "25", label: "Good scalability features" },
        { value: "15", label: "Basic scalability" },
        { value: "5", label: "Limited scalability" }
      ]
    },
    {
      name: "Growth Sustainability",
      maxPoints: 30,
      options: [
        { value: "30", label: "Strong long-term sustainability" },
        { value: "20", label: "Good sustainability planning" },
        { value: "10", label: "Basic sustainability measures" },
        { value: "5", label: "Limited sustainability" }
      ]
    }
  ],
  wei: [
    {
      name: "Job Creation & Transformation",
      maxPoints: 35,
      options: [
        { value: "35", label: "Significant new role creation" },
        { value: "25", label: "Moderate role creation" },
        { value: "15", label: "Limited new roles" },
        { value: "5", label: "Minimal role development" }
      ]
    },
    {
      name: "Training & Development",
      maxPoints: 35,
      options: [
        { value: "35", label: "Comprehensive training infrastructure" },
        { value: "25", label: "Strong training programs" },
        { value: "15", label: "Basic training offered" },
        { value: "5", label: "Limited training" }
      ]
    },
    {
      name: "Worker Support",
      maxPoints: 30,
      options: [
        { value: "30", label: "Comprehensive support system" },
        { value: "20", label: "Strong support measures" },
        { value: "10", label: "Basic support" },
        { value: "5", label: "Limited support" }
      ]
    }
  ]
};

// Dimension titles for display
export const dimensionTitles = {
  svc: "Social Value Creation",
  eai: "Ethical AI Implementation",
  cim: "Community Impact Measurement",
  rsm: "Responsible Scaling Metrics",
  wei: "Workforce Evolution Impact"
};

// Industry adjustment factors
export const industryAdjustments = {
  financial: {
    eai: 1.2,  // 20% more weight on ethical implementation
    cim: 0.9,  // 10% less weight on community impact
    rsm: 1.1,  // 10% more weight on scaling
    wei: 0.9,  // 10% less weight on workforce
    svc: 0.9   // 10% less weight on social value
  },
  healthcare: {
    eai: 1.3,  // 30% more weight on ethical implementation
    cim: 1.2,  // 20% more weight on community impact
    rsm: 0.9,  // 10% less weight on scaling
    wei: 1.0,  // no adjustment
    svc: 1.2   // 20% more weight on social value
  },
  manufacturing: {
    eai: 0.9,  // 10% less weight on ethical implementation
    cim: 1.1,  // 10% more weight on community impact
    rsm: 1.2,  // 20% more weight on scaling
    wei: 1.3,  // 30% more weight on workforce
    svc: 1.0   // no adjustment
  },
  technology: {
    eai: 1.1,  // 10% more weight on ethical implementation
    cim: 1.0,  // no adjustment
    rsm: 1.2,  // 20% more weight on scaling
    wei: 1.1,  // 10% more weight on workforce
    svc: 1.1   // 10% more weight on social value
  }
};