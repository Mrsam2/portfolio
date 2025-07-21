"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { X, ExternalLink, Github, Play, Code, Terminal } from "lucide-react"
import { useState } from "react"

interface ProjectModalProps {
  project: any
  onClose: () => void
  isMobile?: boolean
}

export default function ProjectModal({ project, onClose, isMobile = false }: ProjectModalProps) {
  const [activeDemo, setActiveDemo] = useState("overview")

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-2"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        className={`bg-gray-900 border border-gray-700 rounded-xl w-full ${
          isMobile ? "max-w-sm max-h-[85vh]" : "max-w-4xl max-h-[90vh]"
        } overflow-hidden`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className={`flex items-center justify-between ${isMobile ? "p-4" : "p-6"} border-b border-gray-700`}>
          <div className="flex items-center gap-3">
            <div
              className={`${isMobile ? "w-8 h-8" : "w-12 h-12"} rounded-full flex items-center justify-center`}
              style={{ backgroundColor: project.color + "20", border: `2px solid ${project.color}` }}
            >
              {project.type === "planet" && "🪐"}
              {project.type === "star" && "⭐"}
              {project.type === "asteroid" && "☄️"}
            </div>
            <div>
              <h2 className={`${isMobile ? "text-lg" : "text-2xl"} font-bold text-white`}>{project.name}</h2>
              <p className={`text-gray-400 ${isMobile ? "text-xs" : ""}`}>
                {isMobile ? project.name : project.description}
              </p>
            </div>
          </div>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="w-4 h-4" />
          </Button>
        </div>

        {/* Content */}
        <div className={`${isMobile ? "p-4" : "p-6"} overflow-y-auto`}>
          <Tabs value={activeDemo} onValueChange={setActiveDemo} className="w-full">
            <TabsList className={`grid w-full ${isMobile ? "grid-cols-2" : "grid-cols-4"} bg-gray-800`}>
              <TabsTrigger value="overview" className="data-[state=active]:bg-gray-700 text-xs">
                <Code className="w-3 h-3 mr-1" />
                {isMobile ? "Info" : "Overview"}
              </TabsTrigger>
              <TabsTrigger value="demo" className="data-[state=active]:bg-gray-700 text-xs">
                <Play className="w-3 h-3 mr-1" />
                Demo
              </TabsTrigger>
              {!isMobile && (
                <>
                  <TabsTrigger value="code" className="data-[state=active]:bg-gray-700 text-xs">
                    <Terminal className="w-3 h-3 mr-1" />
                    Code
                  </TabsTrigger>
                  <TabsTrigger value="details" className="data-[state=active]:bg-gray-700 text-xs">
                    <ExternalLink className="w-3 h-3 mr-1" />
                    Details
                  </TabsTrigger>
                </>
              )}
            </TabsList>

            {/* Rest of the tabs content remains the same but with responsive classes */}
            <TabsContent value="overview" className="mt-4">
              <Card className="bg-gray-800 border-gray-700">
                <CardHeader className={isMobile ? "p-4" : ""}>
                  <CardTitle className="text-white text-lg">Project Overview</CardTitle>
                  <CardDescription className="text-sm">{project.description}</CardDescription>
                </CardHeader>
                <CardContent className={isMobile ? "p-4 pt-0" : ""}>
                  <div className="space-y-4">
                    <div>
                      <h4 className="text-sm font-semibold text-gray-300 mb-2">Technologies Used</h4>
                      <div className="flex flex-wrap gap-2">
                        {project.tech.map((tech: string) => (
                          <Badge key={tech} variant="secondary" className="bg-gray-700 text-gray-300 text-xs">
                            {tech}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div className={`flex gap-2 ${isMobile ? "flex-col" : "flex-row"}`}>
                      <Button asChild className="bg-blue-600 hover:bg-blue-700 text-sm">
                        <a href={project.link} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="w-3 h-3 mr-2" />
                          View Live
                        </a>
                      </Button>
                      <Button variant="outline" asChild className="text-sm bg-transparent">
                        <a href={project.github} target="_blank" rel="noopener noreferrer">
                          <Github className="w-3 h-3 mr-2" />
                          Source Code
                        </a>
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="demo" className="mt-4">
              <Card className="bg-gray-800 border-gray-700">
                <CardHeader className={isMobile ? "p-4" : ""}>
                  <CardTitle className="text-white text-lg">Interactive Demo</CardTitle>
                </CardHeader>
                <CardContent className={isMobile ? "p-4 pt-0" : ""}>
                  <div
                    className={`bg-gray-900 rounded-lg p-2 ${isMobile ? "h-64" : "h-96"} flex items-center justify-center`}
                  >
                    <iframe
                      src={project.link}
                      className="w-full h-full rounded border-0"
                      title={`${project.name} Demo`}
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {!isMobile && (
              <>
                <TabsContent value="code" className="mt-4">
                  <Card className="bg-gray-800 border-gray-700">
                    <CardHeader>
                      <CardTitle className="text-white text-lg">Code Snippet</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="bg-gray-900 rounded-lg p-4 font-mono text-sm text-green-400 h-96 overflow-auto">
                        <pre>{`// ${project.name} - Key Implementation
${getCodeSnippet(project.id)}`}</pre>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="details" className="mt-4">
                  <Card className="bg-gray-800 border-gray-700">
                    <CardHeader>
                      <CardTitle className="text-white text-lg">Project Details</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4 text-gray-300 text-sm">
                        <div>
                          <h4 className="font-semibold mb-2">Key Features</h4>
                          <ul className="list-disc list-inside space-y-1">
                            {getProjectFeatures(project.id).map((feature: string, index: number) => (
                              <li key={index}>{feature}</li>
                            ))}
                          </ul>
                        </div>

                        <div>
                          <h4 className="font-semibold mb-2">Challenges & Solutions</h4>
                          <p>{getProjectChallenges(project.id)}</p>
                        </div>

                        <div>
                          <h4 className="font-semibold mb-2">Impact & Results</h4>
                          <p>{getProjectImpact(project.id)}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </>
            )}
          </Tabs>
        </div>
      </motion.div>
    </motion.div>
  )
}

function getCodeSnippet(projectId: string): string {
  const snippets: Record<string, string> = {
    "uba-website": `
// Dynamic content loading for UBA projects
function loadProjects() {
  fetch('/api/projects')
    .then(response => response.json())
    .then(data => {
      renderProjectGrid(data);
      initializeFilters();
    });
}

// Responsive image gallery
const gallery = new Swiper('.project-gallery', {
  slidesPerView: 'auto',
  spaceBetween: 20,
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
});`,
    "vector-lab": `
// Interactive service showcase
class ServiceShowcase {
  constructor() {
    this.services = [];
    this.init();
  }
  
  init() {
    this.loadServices();
    this.bindEvents();
  }
  
  loadServices() {
    // Fetch and display services dynamically
    this.services.forEach(service => {
      this.renderServiceCard(service);
    });
  }
}`,
    "gram-arogya": `
// Flutter telemedicine app - Appointment booking
class AppointmentService {
  static Future<void> bookAppointment(Appointment appointment) async {
    try {
      await FirebaseFirestore.instance
          .collection('appointments')
          .add(appointment.toMap());
      
      // Send notification to doctor
      await NotificationService.sendToDoctor(
        appointment.doctorId,
        'New appointment booked'
      );
    } catch (e) {
      throw Exception('Failed to book appointment: $e');
    }
  }
}`,
    "infinity-event": `
// Event registration system
document.addEventListener('DOMContentLoaded', function() {
  const registrationForm = document.getElementById('registration-form');
  
  registrationForm.addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const formData = new FormData(this);
    const response = await fetch('/register', {
      method: 'POST',
      body: formData
    });
    
    if (response.ok) {
      showSuccessMessage('Registration successful!');
    }
  });
});`,
    "insight-event": `
// Cultural event showcase with animations
const eventShowcase = {
  init() {
    this.setupAnimations();
    this.loadEventData();
  },
  
  setupAnimations() {
    gsap.registerPlugin(ScrollTrigger);
    
    gsap.from('.event-card', {
      y: 100,
      opacity: 0,
      duration: 1,
      stagger: 0.2,
      scrollTrigger: '.events-section'
    });
  }
};`,
  }

  return snippets[projectId] || "// Code snippet not available"
}

function getProjectFeatures(projectId: string): string[] {
  const features: Record<string, string[]> = {
    "uba-website": [
      "Responsive design for all devices",
      "Dynamic project showcase",
      "Admin panel for content management",
      "SEO optimized structure",
      "Fast loading performance",
    ],
    "vector-lab": [
      "Modern corporate design",
      "Service portfolio showcase",
      "Contact form integration",
      "Client testimonials section",
      "Mobile-first approach",
    ],
    "gram-arogya": [
      "Doctor appointment booking",
      "Health record management",
      "Push notifications",
      "In-app payment integration",
      "Telemedicine video calls",
    ],
    "infinity-event": [
      "Event registration system",
      "Schedule management",
      "Speaker profiles",
      "Live updates",
      "Social media integration",
    ],
    "insight-event": [
      "Cultural event showcase",
      "Interactive gallery",
      "Performance schedules",
      "Participant registration",
      "Real-time updates",
    ],
  }

  return features[projectId] || ["Feature details not available"]
}

function getProjectChallenges(projectId: string): string {
  const challenges: Record<string, string> = {
    "uba-website":
      "The main challenge was creating a content management system that could handle multiple types of rural development projects while maintaining performance and accessibility for users with limited internet connectivity.",
    "vector-lab":
      "Balancing modern design aesthetics with corporate professionalism while ensuring fast loading times and cross-browser compatibility was the primary challenge.",
    "gram-arogya":
      "Implementing secure telemedicine features while ensuring the app works reliably in rural areas with poor internet connectivity required careful optimization and offline-first design.",
    "infinity-event":
      "Managing real-time event updates and handling high traffic during registration periods required implementing efficient caching and queue management systems.",
    "insight-event":
      "Creating an engaging cultural event website that could showcase diverse performances while maintaining fast loading times and mobile responsiveness.",
  }

  return challenges[projectId] || "Challenge details not available"
}

function getProjectImpact(projectId: string): string {
  const impacts: Record<string, string> = {
    "uba-website":
      "Successfully digitized rural development initiatives, improving transparency and community engagement. The website now serves as a central hub for UBA activities at SVPCET.",
    "vector-lab":
      "Enhanced the company's digital presence, resulting in increased client inquiries and improved brand recognition in the IT services sector.",
    "gram-arogya":
      "Bridged the healthcare gap in rural areas by providing easy access to medical consultations, potentially improving health outcomes for underserved communities.",
    "infinity-event":
      "Streamlined event management and increased participation by 40% through improved user experience and registration process.",
    "insight-event":
      "Successfully promoted cultural activities and increased student engagement in college events through an intuitive and visually appealing platform.",
  }

  return impacts[projectId] || "Impact details not available"
}
