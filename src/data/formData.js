// Form data structure - keyed by stepId and pageId per onboardingConfig.js

export const formData = {
  step1: {
    page1: {
      title: "Company basics",
      subtitle: "Complete this section to get access to the development sandbox.",
      formBlocks: [
        {
          id: "existing-integration",
          title: "Existing integration",
          questions: [
            {
              id: "q1",
              type: "radio",
              label: "Do you have an existing integration with Candescent?",
              options: ["Yes", "No"]
            }
          ]
        },
        {
          id: "company-basics",
          title: "Company basics",
          questions: [
            {
              id: "q1",
              type: "text",
              label: "Company name"
            },
            {
              id: "q2",
              type: "text",
              label: "Company Address"
            },
            {
              id: "q3",
              type: "text",
              label: "Website"
            },
            {
              id: "q4",
              type: "select",
              label: "Number of employees",
              options: ["1-10", "11-50", "51-200", "201-500", "500+"],
              placeholder: "Select"
            },
            {
              id: "q5",
              type: "select",
              label: "How many years have you been in business?",
              options: ["Less than 1 year", "1-5 years", "5-10 years", "10+ years"],
              placeholder: "Select"
            },
            {
              id: "q6",
              type: "textarea",
              label: "Provide a brief description of what your company does for FIs"
            }
          ]
        },
        {
          id: "security-and-compliance-overview",
          title: "Security and compliance overview",
          questions: [
            {
              id: "q1",
              type: "radio",
              label: "Do you have a documented Disaster Recovery and Business Resiliency Program in place?",
              options: ["Yes", "No"]
            },
            {
              id: "q2",
              type: "radio",
              label: "Do you have a documented Security and Compliance Program in place?",
              options: ["Yes", "No"]
            },
            {
              id: "q3",
              type: "radio",
              label: "Do you have a documented software development lifecycle process in place?",
              options: ["Yes", "No"]
            },
            {
              id: "q4",
              type: "radio",
              label: "Does your solution require access to or send card data (PCI)",
              options: ["Yes", "No"]
            },
            {
              id: "q5",
              type: "text",
              label: "Compliance and risk contact name"
            },
            {
              id: "q6",
              type: "text",
              label: "Compliance and risk contact email"
            },
            {
              id: "q7",
              type: "file",
              label: "Upload your PCI document"
            },
            {
              id: "q8",
              type: "file",
              label: "Upload your SOC 2 Type II Report",
              description: "This report must be within last 12 months"
            },
            {
              id: "q9",
              type: "file",
              label: "Upload your Audited Financial Statement"
            }
          ]
        }
      ]
    }
  },
  step2: {
    page1: {
      title: "Risk management strategies and process questions",
      subtitle: "Complete this section of the application to continue.",
      formBlocks: [
        {
          id: "data-history",
          title: "Data History",
          questions: [
            {
              id: "q1",
              type: "textarea",
              label: "If as part of the product/service you provide, you have access to Candescent systems, please describe that access."
            },
            {
              id: "q2",
              type: "radio",
              label: "Has your company suffered a data loss or security breach within the last 3 years?",
              options: ["Yes", "No"]
            },
            {
              id: "q3",
              type: "radio",
              label: "Have any of your Third Party vendors suffered a data loss or security breach within the last 3 years?",
              options: ["Yes", "No"]
            }
          ]
        },
        {
          id: "asset-management",
          title: "Asset Management",
          questions: [
            {
              id: "q1",
              type: "radio",
              label: "Do you have an asset management program for all your assets which tracks hardware and software throughout its life cycle?",
              options: ["Yes", "No"]
            },
            {
              id: "q2",
              type: "radio",
              label: "Do you have an asset classification scheme?",
              options: ["Yes", "No"]
            },
            {
              id: "q3",
              type: "radio",
              label: "Are assets classified according to function and criticality?",
              options: ["Yes", "No"]
            }
          ]
        },
        {
          id: "business-environment",
          title: "Business Environment",
          questions: [
            {
              id: "q1",
              type: "radio",
              label: "Do you conduct thorough background checks on employees and subcontractors with access to critical systems or confidential information?",
              options: ["Yes", "No"]
            },
            {
              id: "q2",
              type: "radio",
              label: "Do you complete drug screening and/or credit score reviews on potential employees and contractors?",
              options: ["Yes", "No"]
            },
            {
              id: "q3",
              type: "radio",
              label: "Are your business systems classified according to criticality?",
              options: ["Yes", "No"]
            },
            {
              id: "q4",
              type: "radio",
              label: "Is each critical business system assigned an owner?",
              options: ["Yes", "No"]
            }
          ]
        },
        {
          id: "risk-assessment",
          title: "Risk Assessment and Mitigation",
          questions: [
            {
              id: "q1",
              type: "radio",
              label: "Does your risk assessment process include current and evolving industry threats?",
              options: ["Yes", "No"]
            },
            {
              id: "q2",
              type: "radio",
              label: "Have you performed a risk assessment for all your critical business systems?",
              options: ["Yes", "No"]
            },
            {
              id: "q3",
              type: "radio",
              label: "Do you perform the risk assessment at least annually?",
              options: ["Yes", "No"]
            },
            {
              id: "q4",
              type: "select",
              label: "How often do you perform your Penetration Test?",
              options: ["Annually", "Semi-annually", "Quarterly", "Monthly", "Other"]
            },
            {
              id: "q5",
              type: "date",
              label: "What was the date of your last Penetration Test?",
            },
            {
              id: "q6",
              type: "radio",
              label: "Were there any findings rated critical or high?",
              options: ["Yes", "No"]
            },
            {
              id: "q7",
              type: "radio",
              label: "If so, were the findings remediated?",
              options: ["Yes", "No"]
            },
            {
              id: "q8",
              type: "text",
              label: "If not, what is the time frame/policy for remediation?",
              placeholder: "Please describe the time frame or policy"
            },
            {
              id: "q9",
              type: "select",
              label: "How often do you perform your Vulnerability Test?",
              options: ["Annually", "Semi-annually", "Quarterly", "Monthly", "Other"]
            },
            {
              id: "q10",
              type: "date",
              label: "What was the date of your last Vulnerability Test?",
            },
            {
              id: "q11",
              type: "radio",
              label: "Were there any findings rated critical or high?",
              options: ["Yes", "No"]
            },
            {
              id: "q12",
              type: "radio",
              label: "If so, were the findings remediated?",
              options: ["Yes", "No"]
            },
            {
              id: "q13",
              type: "textarea",
              label: "If not, what is the time frame/policy for remediation?",
              placeholder: "Please describe the time frame or policy"
            }
          ]
        },
        {
          id: "change-management",
          title: "Change Management",
          questions: [
            {
              id: "q1",
              type: "radio",
              label: "Do you have well-documented, formal change management process and procedures in place?",
              options: ["Yes", "No"]
            }
          ]
        },
        {
          id: "security-program",
          title: "Security Program",
          questions: [
            {
              id: "q1",
              type: "radio",
              label: "Does your organization have a designated Security Officer?",
              options: ["Yes", "No"]
            },
            {
              id: "q2",
              type: "radio",
              label: "Does your cybersecurity function have a clear reporting line that does not present a conflict of interest?",
              options: ["Yes", "No"]
            },
            {
              id: "q3",
              type: "radio",
              label: "Do you have an established Security Program?",
              options: ["Yes", "No"]
            },
            {
              id: "q4",
              type: "radio",
              label: "Is your security program based on a standard such as SANS or NIST?",
              options: ["Yes", "No"]
            },
            {
              id: "q5",
              type: "textarea",
              label: "If not SANS or NIST, please explain what standard your security program is based on.",
              placeholder: "Please describe the standard"
            },
            {
              id: "q6",
              type: "radio",
              label: "Does your security program include metrics which measure the maturity of your security program?",
              options: ["Yes", "No"]
            },
            {
              id: "q7",
              type: "radio",
              label: "Does the program measure the effectiveness of your security controls?",
              options: ["Yes", "No"]
            },
            {
              id: "q8",
              type: "radio",
              label: "Do you measure the effectiveness of your security program at least annually?",
              options: ["Yes", "No"]
            },
            {
              id: "q9",
              type: "radio",
              label: "Are you using your security program to drive improvements in your security posture?",
              options: ["Yes", "No"]
            },
            {
              id: "q10",
              type: "radio",
              label: "Do you have a program for continuing cybersecurity training and skill development for cybersecurity staff?",
              options: ["Yes", "No"]
            },
            {
              id: "q11",
              type: "radio",
              label: "Do you have an ongoing Security Awareness Training Program for both new and current employees?",
              options: ["Yes", "No"]
            },
            {
              id: "q12",
              type: "radio",
              label: "Does your Security Awareness Training Program include phishing awareness?",
              options: ["Yes", "No"]
            },
            {
              id: "q13",
              type: "radio",
              label: "Does your Security Awareness Training Program include web surfing awareness?",
              options: ["Yes", "No"]
            },
            {
              id: "q14",
              type: "radio",
              label: "Do you have an Employee Acceptable Use Policy for your corporate IT resources?",
              options: ["Yes", "No"]
            },
            {
              id: "q15",
              type: "radio",
              label: "Do you have a program for talent recruitment, retention, and succession planning for the cybersecurity and resilience staffs?",
              options: ["Yes", "No"]
            },
            {
              id: "q16",
              type: "radio",
              label: "Do you perform annual security gap analysis?",
              options: ["Yes", "No"]
            }
          ]
        },
        {
          id: "third-party-vendors",
          title: "3rd Party vendors / 4th Parties to Candescent",
          questions: [
            {
              id: "q1",
              type: "radio",
              label: "Do you have a Third Party Risk Management program?",
              options: ["Yes", "No"]
            },
            {
              id: "q2",
              type: "radio",
              label: "Does your internal audit or a third-party conduct independent reviews of your third-party risk management program?",
              options: ["Yes", "No"]
            },
            {
              id: "q3",
              type: "radio",
              label: "Do you periodically reassess your critical vendors?",
              options: ["Yes", "No"]
            },
            {
              id: "q4",
              type: "radio",
              label: "Do you require all of your critical 3rd party vendors to carry insurance (Liability, Property, Cyber)?",
              options: ["Yes", "No"]
            },
            {
              id: "q5",
              type: "radio",
              label: "Have you conducted due diligence to verify whether your 3rd parties have known outstanding issues with regulatory entities or law enforcement agencies?",
              options: ["Yes", "No"]
            },
            {
              id: "q6",
              type: "radio",
              label: "Do you track customer complaints or obtain regular reports of customer complaints regarding your 3rd party vendors?",
              options: ["Yes", "No"]
            },
            {
              id: "q7",
              type: "radio",
              label: "Do you analyze and remediate those complaints?",
              options: ["Yes", "No"]
            },
            {
              id: "q8",
              type: "radio",
              label: "Do you periodically review online activity, publicity, public reports, or social media for adverse events involving your 3rd and 4th party vendors?",
              options: ["Yes", "No"]
            },
            {
              id: "q9",
              type: "radio",
              label: "Do you periodically review externally available cyber risk security ratings (Bitsight, RiskRecon, etc.) for your 3rd and 4th party vendors?",
              options: ["Yes", "No"]
            },
            {
              id: "q10",
              type: "radio",
              label: "Do any of your 3rd party vendors have access to Candescent end user / customer or employee data?",
              options: ["Yes", "No"]
            },
            {
              id: "q11",
              type: "textarea",
              label: "If so, please provide a list of the data and the company names to which the 3rd party vendors have access.",
              placeholder: "Please provide the list"
            },
            {
              id: "q12",
              type: "radio",
              label: "Does the 3rd party have access to Candescent systems?",
              options: ["Yes", "No"]
            },
            {
              id: "q13",
              type: "radio",
              label: "If so, do you log, audit and monitor that access?",
              options: ["Yes", "No"]
            },
            {
              id: "q14",
              type: "radio",
              label: "Does the 3rd party have access to Candescent Intellectual Property?",
              options: ["Yes", "No"]
            },
            {
              id: "q15",
              type: "radio",
              label: "Do the 3rd parties send any type of email communications directly to Candescent Financial Institutions or end users?",
              options: ["Yes", "No"]
            },
            {
              id: "q16",
              type: "radio",
              label: "Are formal contracts that address relevant security and privacy requirements in place for all third parties that process, store, or transmit confidential data or provide critical services?",
              options: ["Yes", "No"]
            },
            {
              id: "q17",
              type: "textarea",
              label: "Please provide the names, locations, and services provided by all 3rd and 4th parties you use to support the products/services provided to Candescent.",
              placeholder: "Please provide the information"
            }
          ]
        }
      ]
    },
    page2: {
      title: "Operational Strategies and Processes Questions",
      subtitle: "Complete this section to continue with the onboarding process.",
      formBlocks: [
        {
          id: "access-control",
          title: "Access Control",
          questions: [
            {
              id: "q1",
              type: "radio",
              label: "Do you have a formal identity and access management program?",
              options: ["Yes", "No"]
            },
            {
              id: "q2",
              type: "radio",
              label: "If yes, does your IAM support automated workflows for access management provisioning and de-provisioning?",
              options: ["Yes", "No"]
            },
            {
              id: "q3",
              type: "radio",
              label: "Does your IAM support MFA for enhanced user authentication to access internal systems?",
              options: ["Yes", "No"]
            },
            {
              id: "q4",
              type: "radio",
              label: "Do you have a clearly defined policy for managing access, including provisioning, de-provisioning, and regular reviews of user access levels and permissions? (This includes physical assets as well.)",
              options: ["Yes", "No"]
            },
            {
              id: "q5",
              type: "radio",
              label: "Do you maintain a list of all privileged accounts and do you audit the use of those accounts?",
              options: ["Yes", "No"]
            },
            {
              id: "q6",
              type: "radio",
              label: "Do employees with privileged account permissions receive additional cybersecurity training commensurate with their levels of responsibility?",
              options: ["Yes", "No"]
            },
            {
              id: "q7",
              type: "radio",
              label: "Are data classification labels used in your role based access control?",
              options: ["Yes", "No"]
            },
            {
              id: "q8",
              type: "radio",
              label: "Do you maintain the principle of least privilege when granting logical access to systems, data or resources for both your employees and subcontractors?",
              options: ["Yes", "No"]
            },
            {
              id: "q9",
              type: "radio",
              label: "Do you track and audit third party or contractor accounts that have access to your system?",
              options: ["Yes", "No"]
            },
            {
              id: "q10",
              type: "radio",
              label: "Is access terminated for third party or contractor relationships the same day the relationship is ended?",
              options: ["Yes", "No"]
            },
            {
              id: "q11",
              type: "radio",
              label: "Are vendor supplied default configurations (including usernames and passwords) changed, and/or disabled before use in production environments?",
              options: ["Yes", "No"]
            },
            {
              id: "q12",
              type: "radio",
              label: "Are staff able to access client data in an unencrypted state?",
              options: ["Yes", "No"]
            },
            {
              id: "q13",
              type: "radio",
              label: "Do access control requests require manager approvals?",
              options: ["Yes", "No"]
            }
          ]
        },
        {
          id: "data-security",
          title: "Data Security",
          questions: [
            {
              id: "q1",
              type: "radio",
              label: "Do you encrypt the data you collect and store from Candescent?",
              options: ["Yes", "No"]
            },
            {
              id: "q2",
              type: "radio",
              label: "Do you have data owner and data custodian roles defined and assigned to your data?",
              options: ["Yes", "No"]
            },
            {
              id: "q3",
              type: "radio",
              label: "Do you encrypt all sensitive data at rest?",
              options: ["Yes", "No"]
            },
            {
              id: "q4",
              type: "radio",
              label: "Do you have a data handling policy for the data you receive from Candescent which includes data collection, retention and destruction?",
              options: ["Yes", "No"]
            },
            {
              id: "q5",
              type: "radio",
              label: "Do you have a data classification and labeling scheme as part of your Security Program?",
              options: ["Yes", "No"]
            },
            {
              id: "q6",
              type: "radio",
              label: "Do you have a centralized encryption key management system?",
              options: ["Yes", "No"]
            },
            {
              id: "q7",
              type: "radio",
              label: "Do you maintain and audit a list of authorized users with access to encryption keys?",
              options: ["Yes", "No"]
            },
            {
              id: "q8",
              type: "radio",
              label: "Do all of your laptops with access to sensitive data have full disk encryption enabled?",
              options: ["Yes", "No"]
            },
            {
              id: "q9",
              type: "radio",
              label: "Do you deploy MDM on the devices that may have access to corporate data?",
              options: ["Yes", "No"]
            },
            {
              id: "q10",
              type: "radio",
              label: "Do you use publicly available object storage technologies such as AWS S3 to store customer data?",
              options: ["Yes", "No"]
            },
            {
              id: "q11",
              type: "radio",
              label: "If yes, is Candescent data stored in a single or multi-tenant environment?",
              options: ["Yes", "No"]
            },
            {
              id: "q12",
              type: "textarea",
              label: "Please describe the moments you take to ensure the data is not publicly accessible?",
              placeholder: "Please describe..."
            }
          ]
        },
        {
          id: "physical-access-control",
          title: "Physical Access Control (on-prem, hosted, cloud)",
          questions: [
            {
              id: "q1",
              type: "radio",
              label: "Do you/your vendor maintain the principle of least privilege when granting physical access to corporate resources, including data center(s)?",
              options: ["Yes", "No"]
            },
            {
              id: "q2",
              type: "radio",
              label: "Do you/your vendor have procedural and technical controls such as badge readers, security cameras, biometric identification devices, etc. to control physical access of persons to corporate IT resources, including data centers?",
              options: ["Yes", "No"]
            },
            {
              id: "q3",
              type: "radio",
              label: "Do you/your vendor maintain access logs from badge readers, security cameras, biometric identification devices, etc?",
              options: ["Yes", "No"]
            },
            {
              id: "q4",
              type: "radio",
              label: "Are access logs from badge readers, security cameras, biometric identification devices, etc. maintained at least 6 months?",
              options: ["Yes", "No"]
            },
            {
              id: "q5",
              type: "textarea",
              label: "If not, please clarify how long they are maintained.",
              placeholder: "Please specify..."
            },
            {
              id: "q6",
              type: "radio",
              label: "Do you/your vendor conduct periodic access reviews to ensure that only people with the appropriate roles and permissions are accessing your corporate resources, including data centers?",
              options: ["Yes", "No"]
            },
            {
              id: "q7",
              type: "textarea",
              label: "If you provide a hosted service, please provide the location(s) (city and state, or region/country) from which that hosted service is running.",
              placeholder: "Please provide location(s)..."
            }
          ]
        },
        {
          id: "operations",
          title: "Operations",
          questions: [
            {
              id: "q1",
              type: "radio",
              label: "Does your organization have the capability to detect unauthorized changes to your systems?",
              options: ["Yes", "No"]
            },
            {
              id: "q2",
              type: "radio",
              label: "Do you have the capability to define normal baseline events as well as the capability to detect and identify any deviations from normal?",
              options: ["Yes", "No"]
            },
            {
              id: "q3",
              type: "radio",
              label: "Network events?",
              options: ["Yes", "No"]
            },
            {
              id: "q4",
              type: "radio",
              label: "Security events?",
              options: ["Yes", "No"]
            },
            {
              id: "q5",
              type: "radio",
              label: "Application events?",
              options: ["Yes", "No"]
            },
            {
              id: "q6",
              type: "radio",
              label: "Infrastructure services?",
              options: ["Yes", "No"]
            },
            {
              id: "q7",
              type: "radio",
              label: "Do you have a SIEM?",
              options: ["Yes", "No"]
            },
            {
              id: "q8",
              type: "radio",
              label: "Do you monitor your own cybersecurity risk based on external cybersecurity vendor reports such as BitSight, RiskRecon, etc.",
              options: ["Yes", "No"]
            },
            {
              id: "q9",
              type: "radio",
              label: "Do you have staff that can review security event data and drive actions based on that data?",
              options: ["Yes", "No"]
            },
            {
              id: "q10",
              type: "radio",
              label: "Do you have comprehensive policies for Logging?",
              options: ["Yes", "No"]
            },
            {
              id: "q11",
              type: "radio",
              label: "Do you have comprehensive policies for Log management?",
              options: ["Yes", "No"]
            },
            {
              id: "q12",
              type: "radio",
              label: "Is multi-factor authentication used when connecting to VPN, cloud interfaces (AWS, Azure, etc.) and/or other critical infrastructure systems?",
              options: ["Yes", "No"]
            }
          ]
        },
        {
          id: "incident-response",
          title: "Incident Response",
          questions: [
            {
              id: "q1",
              type: "radio",
              label: "Does your organization have a formal Information security incident management process?",
              options: ["Yes", "No"]
            },
            {
              id: "q2",
              type: "radio",
              label: "Do you have the appropriate processes and procedures to deal with Security threats that affect your services?",
              options: ["Yes", "No"]
            },
            {
              id: "q3",
              type: "radio",
              label: "Is there a 24/7 security incident response team with clearly defined and documented roles and responsibilities?",
              options: ["Yes", "No"]
            },
            {
              id: "q4",
              type: "radio",
              label: "Do you have adequate cyber insurance to cover damages resulting from critical security incidents?",
              options: ["Yes", "No"]
            },
            {
              id: "q5",
              type: "radio",
              label: "Do you test your response policies/plans at least annually?",
              options: ["Yes", "No"]
            },
            {
              id: "q6",
              type: "radio",
              label: "Do you have the appropriate processes and procedures to deal with Systems failures that affect your services?",
              options: ["Yes", "No"]
            },
            {
              id: "q7",
              type: "radio",
              label: "Do you have the appropriate processes and procedures to deal with Data integrity issues that affect your services?",
              options: ["Yes", "No"]
            },
            {
              id: "q8",
              type: "radio",
              label: "Is there a predefined plan for handling incidents, involving data exposure or violations to data privacy laws?",
              options: ["Yes", "No"]
            },
            {
              id: "q9",
              type: "radio",
              label: "Are you prepared to handle incidents that are a result of emerging technologies (deep fakes, supply chain attacks, etc.)?",
              options: ["Yes", "No"]
            }
          ]
        },
        {
          id: "ransomware",
          title: "Ransomware",
          questions: [
            {
              id: "q1",
              type: "radio",
              label: "Do you have a ransomware playbook?",
              options: ["Yes", "No"]
            },
            {
              id: "q2",
              type: "radio",
              label: "If yes, do you test & update this playbook at least annually?",
              options: ["Yes", "No"]
            },
            {
              id: "q3",
              type: "radio",
              label: "As part of your ransomware playbook, have you evaluated whether or not your organization will pay ransom in the event of a critical ransomware attack? (Note: we're not asking what that decision is.)",
              options: ["Yes", "No"]
            },
            {
              id: "q4",
              type: "radio",
              label: "Do you have enough coverage in your cyber insurance to meet your RTO/RPO commitments in the event of a catastrophic ransomware event?",
              options: ["Yes", "No"]
            },
            {
              id: "q5",
              type: "radio",
              label: "Do you have a 3-2-1 backup strategy to meet your RTO/RPO commitments in the event of a catastrophic ransomware event?",
              options: ["Yes", "No"]
            },
            {
              id: "q6",
              type: "textarea",
              label: "How do you maintain integrity of your infrastructure in the event of a ransomware attack if your data is constantly replicated and there is no snapshot of your data offsite?",
              placeholder: "Please describe..."
            },
            {
              id: "q7",
              type: "radio",
              label: "Do you have real-time ransomware detection capabilities?",
              options: ["Yes", "No"]
            }
          ]
        },
        {
          id: "business-continuity",
          title: "Business Continuity and Disaster Recovery Questions",
          questions: [
            {
              id: "q1",
              type: "radio",
              label: "Do you have a Business Continuity and Disaster Recovery Plan?",
              options: ["Yes", "No"]
            },
            {
              id: "q2",
              type: "radio",
              label: "Do you test your BCP/DR plans at least annually?",
              options: ["Yes", "No"]
            },
            {
              id: "q3",
              type: "date",
              label: "What was the date of the last exercise that included actual recovery of all of the application systems that are needed to resume provisioning of the products and services that Candescent receives from you?",
            },
            {
              id: "q4",
              type: "radio",
              label: "Was RPO/RTO achieved during the last test?",
              options: ["Yes", "No"]
            },
            {
              id: "q5",
              type: "radio",
              label: "Were any issues identified in your last test?",
              options: ["Yes", "No"]
            },
            {
              id: "q6",
              type: "radio",
              label: "If yes, will those issues be resolved before running your next test?",
              options: ["Yes", "No"]
            },
            {
              id: "q7",
              type: "textarea",
              label: "If not, what is your policy regarding the timeframe for resolution?",
              placeholder: "Please describe..."
            },
            {
              id: "q8",
              type: "radio",
              label: "Are your backup and restore procedures part of the global business continuity and disaster recovery plan?",
              options: ["Yes", "No"]
            },
            {
              id: "q9",
              type: "radio",
              label: "Do you maintain a copy of your production data at another physical or logical location?",
              options: ["Yes", "No"]
            }
          ]
        }
      ]
    },
    page3: {
      title: "Technical control questions",
      subtitle: "Complete this section to continue.",
      formBlocks: [
        {
          id: "network-segmentation",
          title: "Network segmentation",
          questions: [
            { id: "q1", type: "radio", label: "Are your networks segmented according to function, purpose, and security classification?", options: ["Yes", "No"] },
            { id: "q2", type: "radio", label: "Do you have a restricted management network for the management of your information systems?", options: ["Yes", "No"] },
            { id: "q3", type: "radio", label: "Do you require VPN access to touch your data center management resources?", options: ["Yes", "No"] },
            { id: "q4", type: "textarea", label: "If yes, how do you connect to your data center management resources?" },
            { id: "q5", type: "radio", label: "Do you have a firewall rule management system which allows for tracking and auditing all firewall rules through their lifecycle?", options: ["Yes", "No"] },
            { id: "q6", type: "radio", label: "Do you audit the accuracy of your Firewall rules at least annually?", options: ["Yes", "No"] },
            { id: "q7", type: "radio", label: "Do you control egress network traffic from your user networks?", options: ["Yes", "No"] },
            { id: "q8", type: "radio", label: "Do you control egress network traffic from your data center networks?", options: ["Yes", "No"] },
            { id: "q9", type: "radio", label: "Do you have web content filtering policies implemented for your User networks?", options: ["Yes", "No"] },
            { id: "q10", type: "radio", label: "Do you have web content filtering policies implemented for your Data Center networks?", options: ["Yes", "No"] },
            { id: "q11", type: "radio", label: "Do you have SSL decryption and inspection capabilities for Ingress Network traffic?", options: ["Yes", "No"] },
            { id: "q12", type: "radio", label: "Do you have SSL decryption and inspection capabilities for Egress Network traffic?", options: ["Yes", "No"] },
            { id: "q13", type: "radio", label: "Do you have SSL decryption and inspection capabilities for User Network traffic?", options: ["Yes", "No"] },
            { id: "q14", type: "radio", label: "Do you have SSL decryption and inspection capabilities for Server Network traffic?", options: ["Yes", "No"] },
            { id: "q15", type: "radio", label: "Do you have malware detection/blocking capabilities on Endpoint devices?", options: ["Yes", "No"] },
            { id: "q16", type: "radio", label: "Do you have malware detection/blocking capabilities on the Network core?", options: ["Yes", "No"] },
            { id: "q17", type: "radio", label: "Do you have malware detection/blocking capabilities on the Network Edge?", options: ["Yes", "No"] },
            { id: "q18", type: "radio", label: "Do you use DNS malware filtering/sinkhole services?", options: ["Yes", "No"] },
            { id: "q19", type: "radio", label: "Do you have a vulnerability management program?", options: ["Yes", "No"] },
            { id: "q20", type: "radio", label: "Does 100% of your overall environment get scanned for vulnerabilities?", options: ["Yes", "No"] },
            { id: "q21", type: "radio", label: "Do you patch your Desktop estate at least monthly?", options: ["Yes", "No"] },
            { id: "q22", type: "radio", label: "Do you patch your Production systems, servers, etc. at least monthly?", options: ["Yes", "No"] },
            { id: "q23", type: "radio", label: "Do you have a regular patching cycle for systems, servers, etc. for Non-prod?", options: ["Yes", "No"] },
            { id: "q24", type: "select", label: "How quickly do you patch critical vulnerabilities which are outside your normal patch deployment cycle?", options: ["Within 24 hours", "Within 48 hours", "Within 7 days", "Within 30 days", "Other"], placeholder: "Select" },
            { id: "q25", type: "radio", label: "Do your users have local administrative rights on the corporate IT Desktop systems?", options: ["Yes", "No"] },
            { id: "q26", type: "radio", label: "Is 100% of your desktop and data center systems have anti-virus software installed and functioning?", options: ["Yes", "No"] },
            { id: "q27", type: "radio", label: "Do you have centralized management alerting and reporting for your anti-malware systems?", options: ["Yes", "No"] },
            { id: "q28", type: "radio", label: "Do you have IDS/IPS capabilities on your End node devices?", options: ["Yes", "No"] },
            { id: "q29", type: "radio", label: "Do you have IDS/IPS capabilities at your Network core?", options: ["Yes", "No"] },
            { id: "q30", type: "radio", label: "Do you have IDS/IPS capabilities at your Network Edge?", options: ["Yes", "No"] },
            { id: "q31", type: "radio", label: "Do you have third party connections to your network?", options: ["Yes", "No"] },
            { id: "q32", type: "radio", label: "Are these third-party network connections monitored for security events?", options: ["Yes", "No"] },
            { id: "q33", type: "radio", label: "Are these third-party network connections verified and reviewed periodically?", options: ["Yes", "No"] },
            { id: "q34", type: "radio", label: "Do you offer wireless access to employees and guests?", options: ["Yes", "No"] },
            { id: "q35", type: "radio", label: "If yes, are these networks segregated and require secure access?", options: ["Yes", "No"] },
            { id: "q36", type: "select", label: "If yes, please provide the type of wireless connection encryption used (WEP, WPA, etc.).", options: ["WEP", "WPA", "WPA2", "WPA3", "Other"], placeholder: "Select" }
          ]
        },
        {
          id: "system-hardening",
          title: "System hardening",
          questions: [
            { id: "q1", type: "radio", label: "Do you have CIS, NIST or SANS or any other system hardening baselines, implemented?", options: ["Yes", "No"] },
            { id: "q2", type: "radio", label: "Do you use automation tools for system deployment?", options: ["Yes", "No"] },
            { id: "q3", type: "radio", label: "Are your system hardening baselines deployed at system initiation and maintained throughout its life cycle?", options: ["Yes", "No"] }
          ]
        },
        {
          id: "dlp",
          title: "DLP",
          questions: [
            { id: "q1", type: "radio", label: "Do you have a system to detect sensitive data at rest in unauthorized locations?", options: ["Yes", "No"] },
            { id: "q2", type: "radio", label: "Do you have a system to detect the transmission through email of unprotected sensitive data?", options: ["Yes", "No"] },
            { id: "q3", type: "radio", label: "Do you have a system to detect the transmission through the network of unprotected sensitive data?", options: ["Yes", "No"] },
            { id: "q4", type: "radio", label: "Do you have a process for correcting the root cause for any unprotected, sensitive data detected through your DLP/unauthorized data & oceans scans?", options: ["Yes", "No"] },
            { id: "q5", type: "radio", label: "Does your security awareness training cover the proper use, storage, and transmission of sensitive data?", options: ["Yes", "No"] }
          ]
        },
        {
          id: "remote-work-policy",
          title: "Remote work policy",
          questions: [
            { id: "q1", type: "radio", label: "Does company provide computer equipment for employees working 100% remote?", options: ["Yes", "No"] },
            { id: "q2", type: "radio", label: "Are these devices secured in the same fashion as the devices of employees working at the office, in with content filtering, email security etc.?", options: ["Yes", "No"] },
            { id: "q3", type: "radio", label: "Do you practice the principle of least privilege when granting user access to the Internet while working remotely?", options: ["Yes", "No"] }
          ]
        },
        {
          id: "software-development-lifecycle",
          title: "Software development lifecycle",
          questions: [
            { id: "q1", type: "radio", label: "Do you incorporate an industry standard SDLC Model for software development?", options: ["Yes", "No"] },
            { id: "q2", type: "textarea", label: "If you are using a secure Software Development Framework (SSDF), what standard is it based on?" },
            { id: "q3", type: "textarea", label: "If you are not using a SSDF, do you have plans to do so in the future, and when?" },
            { id: "q4", type: "radio", label: "Does your organization utilize OWASP Top 10 development practices?", options: ["Yes", "No"] },
            { id: "q5", type: "textarea", label: "If not, what application security standard do you use?" },
            { id: "q6", type: "radio", label: "Do you review security at each phase of the software development lifecycle?", options: ["Yes", "No"] },
            { id: "q7", type: "radio", label: "Do you perform static and/or dynamic source code analysis as part of your SDLC development/release cycle?", options: ["Yes", "No"] },
            { id: "q8", type: "radio", label: "Are vulnerabilities identified through static/dynamic code analysis remediated before implementing newly developed or changed applications into production?", options: ["Yes", "No"] },
            { id: "q9", type: "radio", label: "Is source code actively scanned using automated tools in the development environment and so that security vulnerabilities can be resolved during each phase of the SDLC?", options: ["Yes", "No"] },
            { id: "q10", type: "radio", label: "Is the security of applications, including Web-based applications connected to the internet, tested against known types of cyber attacks (e.g., SQL injection, cross-site scripting, buffer overflows) before implementation or following significant changes?", options: ["Yes", "No"] },
            { id: "q11", type: "radio", label: "Do you use open source/closed source 3rd party, libraries?", options: ["Yes", "No"] },
            { id: "q12", type: "radio", label: "If yes, do you scan for vulnerabilities?", options: ["Yes", "No"] },
            { id: "q13", type: "textarea", label: "If yes, how do you ensure the code you're using is secure?" },
            { id: "q14", type: "radio", label: "Do you complete quality assurance to test third-party code you use?", options: ["Yes", "No"] },
            { id: "q15", type: "radio", label: "Do third parties conduct security assessments on your products?", options: ["Yes", "No"] },
            { id: "q16", type: "radio", label: "Do your development and testing teams undergo regular security training?", options: ["Yes", "No"] },
            { id: "q17", type: "radio", label: "Is your source code, executables and scripts digitally signed to confirm the software author and guarantee that the code has not been altered or corrupted?", options: ["Yes", "No"] },
            { id: "q18", type: "radio", label: "Is source code, executables and scripts of your 3rd parties digitally signed to confirm the software author and guarantee that the code has not been altered or corrupted?", options: ["Yes", "No"] }
          ]
        },
        {
          id: "compliance",
          title: "Compliance",
          questions: [
            { id: "q1", type: "radio", label: "Is the product you provide to Candescent subject to sanctions by the Office of Foreign Assets Control?", options: ["Yes", "No"] },
            { id: "q2", type: "textarea", label: "If yes, please explain how do you meet those requirements/what program do you have in place, whether or not you've had any violations, and if there have been any violations have they been resolved or is there a remediation plan." },
            { id: "q3", type: "radio", label: "Have you had any violations or regulatory actions with applicable supervisory agencies and/or regulatory organizations?", options: ["Yes", "No"] },
            { id: "q4", type: "textarea", label: "If yes, please explain what it was, when it was remediated." },
            { id: "q5", type: "radio", label: "Are you subject to GLBA?", options: ["Yes", "No"] },
            { id: "q6", type: "radio", label: "If Yes, have you had a GLBA audit? (Please provide the results)", options: ["Yes", "No"] },
            { id: "q7", type: "radio", label: "Is the product you provide to Candescent required to comply with the Bank Secrecy Act/Anti-Money Laundering (BSA/AML)? Same as the first one.", options: ["Yes", "No"] },
            { id: "q8", type: "textarea", label: "If yes, please explain how do you meet those requirements/what program do you have in place, whether or not you've had any violations, and if there have been any violations have they been resolved or is there a remediation plan." }
          ]
        },
        {
          id: "artificial-intelligence",
          title: "Artificial intelligence",
          questions: [
            { id: "q1", type: "radio", label: "Do you use any artificial intelligence (including machine learning, generative AI, or BOT) technologies to produce or deliver products or services to Candescent?", options: ["Yes", "No"] },
            { id: "q2", type: "radio", label: "Do you have a formal policy governing usage of AI?", options: ["Yes", "No"] },
            { id: "q3", type: "radio", label: "Does the AI have access to confidential Candescent?", options: ["Yes", "No"] },
            { id: "q4", type: "radio", label: "Are you using public or shared AI technology to process confidential information?", options: ["Yes", "No"] }
          ]
        },
        {
          id: "technology-obsolescence",
          title: "Technology obsolescence",
          questions: [
            { id: "q1", type: "radio", label: "Do you have any end of life technology (e.g., Windows 2003, Windows 2008) that are used to provide services to Candescent?", options: ["Yes", "No"] }
          ]
        }
      ]
    },
    page4: {
      title: "Certifications and Documentation",
      subtitle: "Upload required documentation to complete Step 2.",
      formBlocks: [
        {
          id: "files-to-upload",
          title: "Files to upload",
          questions: [
            {
              id: "q1",
              type: "file",
              label: "ISO27001 Certification",
            },
            {
              id: "q2",
              type: "file",
              label: "Business continuity plan",
            },
            {
              id: "q3",
              type: "file",
              label: "BCP testing summary",
            },
            {
              id: "q4",
              type: "file",
              label: "Penetration Test Results",
            },
            {
              id: "q5",
              type: "file",
              label: "Vulnerability test results",
            },
            {
              id: "q6",
              type: "file",
              label: "Certificate of Insurance",
            }
          ]
        }
      ]
    },
    page5: {
      title: "4th party vendors",
      subtitle: "Complete this section to continue.",
      dynamicFormBlocks: true,
      addVendorCard: {
        heading: "Add 4th parties listing",
        description: "Please list all the 4th parties you will use to support your services.",
        buttonLabel: "Add listing"
      },
      vendorBlockTemplate: {
        questions: [
          { id: "q1", type: "text", label: "4th party name" },
          { id: "q2", type: "textarea", label: "Brief description of the services/product provided by the 4th party" },
          { id: "q3", type: "text", label: "4th party vendor URL" },
          { id: "q4", type: "select", label: "Primary location from where services are delivered", options: ["Onshore (same country)", "Nearshore", "Offshore", "Other"], placeholder: "Select" },
          { id: "q5", type: "select", label: "Criticality of the services to your business", options: ["Critical", "High", "Medium", "Low", "Other"], placeholder: "Select" },
          { id: "q6", type: "radio", label: "Is any Candescent client end user Personal Information or Candescent Confidential Information shared with the 4th party vendor?", options: ["Yes", "No"] },
          { id: "q7", type: "textarea", label: "If so, please provide a list of the data shared." },
          { id: "q8", type: "textarea", label: "If so, does the vendor share this information with any Nth parties? If so, please list the Nth party vendors." },
          { id: "q9", type: "radio", label: "Will this vendor be dealing with any Candescent financial institutions or financial institution customers directly?", options: ["Yes", "No"] },
          { id: "q10", type: "radio", label: "Have you completed security and confidentiality due diligence on this vendor in the previous 12 months?", options: ["Yes", "No"] },
          { id: "q11", type: "textarea", label: "Were there any noteworthy discoveries, and if so, what were they, and how were they addressed?" },
          { id: "q12", type: "radio", label: "Do you have a contract with this vendor right now?", options: ["Yes", "No"] },
          { id: "q13", type: "radio", label: "Will any of the vendor services be performed in another country?", options: ["Yes", "No"] }
        ]
      },
      formBlocks: []
    }
  },
  step3: {
    page1: {
      title: "Product documentation",
      subtitle: "Complete this section to continue.",
      formBlocks: [
        {
          id: "security-documentation",
          title: "Security documentation",
          questions: [
            {
              id: "q1",
              type: "file",
              label: "SOC 1/SOC2",
              description: "Please upload the file specific to this product"
            },
            {
              id: "q2",
              type: "file",
              label: "Pen test results and management",
              description: "Please upload the file specific to this product"
            },
            {
              id: "q3",
              type: "file",
              label: "Vulnerability test results",
              description: "Please upload the file specific to this product"
            },
            {
              id: "q4",
              type: "file",
              label: "BCP/DR and most recent BCP/DR test results",
              description: "Please upload the file specific to this product"
            }
          ]
        },
        {
          id: "technical-documentation",
          title: "Technical documentation",
          questions: [
            {
              id: "q1",
              type: "file",
              label: "Upload Workflow file",
              description: "Description"
            },
            {
              id: "q2",
              type: "file",
              label: "Use cases",
              description: "Description"
            }
          ]
        }
      ]
    },
    page2: {
      title: "Product overview",
      subtitle: "Complete this section to continue.",
      formBlocks: [
        {
          id: "product-overview",
          title: "Product overview",
          questions: [
            { id: "q1", type: "radio", label: "Does the solution utilize or redundant data center spanning different regions?", options: ["Yes", "No"] },
            { id: "q2", type: "textarea", label: "Your application description" },
            { id: "q3", type: "select", label: "What target segment of financial institutions (FIs) are you targeting with your solution?", options: ["Banks", "Credit unions", "Community banks", "All of the above", "Other"], placeholder: "Select" },
            { id: "q4", type: "date", label: "Tentative development start date", placeholder: "MM/DD/YYYY" },
            { id: "q5", type: "date", label: "Tentative development end date", placeholder: "MM/DD/YYYY" },
            { id: "q6", type: "select", label: "What type of integration are you expecting to use?", options: ["API", "File transfer", "Batch", "Real-time", "Other"], placeholder: "Select" },
            { id: "q7", type: "select", label: "What candescent solution are you looking to integrate with", options: ["Candescent Core", "Candescent Connect", "Other"], placeholder: "Select" },
            { id: "q8", type: "radio", label: "Does your solution require access to or send PII?", options: ["Yes", "No"] },
            { id: "q9", type: "radio", label: "Will you be email or communicating directly to an end user on behalf of the FI?", options: ["Yes", "No"] }
          ]
        }
      ]
    },
    page3: {
      title: "Public storefront",
      subtitle: "Complete this section to continue.",
      formBlocks: [
        {
          id: "product-page",
          title: "Product page",
          headerAction: { label: "Preview published page" },
          questions: [
            {
              id: "featured-media",
              type: "mediaGallery",
              label: "Featured images",
              description: "Upload images, videos, or add YouTube links. Drag to reorder. The first item is the featured hero."
            },
            { id: "product-features", type: "textarea", label: "Product Features", placeholder: "" },
            { id: "product-benefits", type: "textarea", label: "Product Benefits", placeholder: "" },
            { id: "company-info", type: "textarea", label: "Company Info", placeholder: "" },
            { id: "support-links", type: "linkList", label: "Support links" },
            {
              id: "supported-languages",
              type: "select",
              label: "Supported Languages",
              options: ["English", "Spanish", "French", "German", "Other"],
              placeholder: "Select"
            }
          ]
        },
        {
          id: "company-page",
          title: "Company page",
          headerAction: { label: "Preview published page" },
          questions: [
            { id: "company-name", type: "text", label: "Company name", placeholder: "" },
            { id: "company-website", type: "text", label: "Company website", placeholder: "https://" },
            { id: "company-logo", type: "file", label: "Company logo", description: "Recommended size and format." },
            {
              id: "tags",
              type: "tagPicker",
              label: "Tags",
              options: [
                "Financial Wellness",
                "Family Banking",
                "Financial Education",
                "Retirement Planning",
                "Budgeting Tools",
                "Savings",
                "Investments",
                "Lending",
                "Payments"
              ]
            }
          ]
        }
      ]
    },
    page4: {
      title: "Integration agreement",
      subtitle: "Complete this section to continue.",
      formBlocks: [
        {
          id: "agreement",
          title: "Agreement",
          questions: [
            {
              id: "agreement-signed",
              type: "agreementSignature",
              label: "Sign the agreement",
              pdfUrl: `${(import.meta.env?.BASE_URL || '/').replace(/\/$/, '')}/examplePDF.pdf`,
              signaturePage: 1
            }
          ]
        }
      ]
    }
  }
}
