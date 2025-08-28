import { createRouter, createRootRoute, createRoute, Outlet } from '@tanstack/react-router'
import { useState, useEffect } from 'react'
import { ArrowUp } from 'lucide-react'
import Lenis from 'lenis'
import Header from './components/layout/Header'
import Footer from './components/layout/Footer'
import { CurrencyProvider } from './contexts/CurrencyContext'
import HeroSection from './components/sections/HeroSection'
import ComparisonSection from './components/sections/ComparisonSection'
import HowItWorksSection from './components/sections/HowItWorksSection'
import TestimonialsSection from './components/sections/TestimonialsSection'
import FAQSection from './components/sections/FAQSection'
import ResourcesSection from './components/sections/ResourcesSection'
import BlogCard from './components/ui/BlogCard'
import content from './data/content.json'
import { useIsMobile } from './hooks/use-mobile'
import { Link, useParams } from '@tanstack/react-router'
import { ArrowLeft, Calendar, Clock, Tag } from 'lucide-react'

function RootComponent() {
  const [activeSection, setActiveSection] = useState<string>('')
  const [scrollProgress, setScrollProgress] = useState<number>(0)
  const [showBackToTop, setShowBackToTop] = useState<boolean>(false)

  useEffect(() => {
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual'
    }
    
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
      autoRaf: true
    })

    window.lenis = lenis

    function raf(time: number) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)

    const handleScroll = () => {
      const scrollTop = window.pageYOffset
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      const scrollPercent = (scrollTop / docHeight) * 100
      setScrollProgress(Math.min(scrollPercent, 100))

      setShowBackToTop(scrollTop > 300)

      const sections = ['comparison', 'features', 'business-model', 'faq', 'testimonials', 'resources']
      
      if (scrollTop < 300) {
        setActiveSection('')
        return
      }
      
      const current = sections.find(sectionId => {
        const element = document.getElementById(sectionId)
        if (element) {
          const rect = element.getBoundingClientRect()
          return rect.top <= 100 && rect.bottom >= 100
        }
        return false
      })
      
      setActiveSection(current || '')
    }

    window.addEventListener('scroll', handleScroll)
    handleScroll()

    return () => {
      lenis.destroy()
      window.lenis = undefined
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  const scrollToSection = (sectionId: string): void => {
    const targetElement = document.getElementById(sectionId)
    
    if (targetElement) {
      targetElement.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      })
    }
  }

  const scrollToTop = (): void => {
    if (window.lenis) {
      window.lenis.scrollTo(0, { duration: 1.5 })
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  return (
    <CurrencyProvider>
      <div className="App">
        <div className="fixed top-0 left-0 w-full h-1 bg-gray-200 z-50">
          <div 
            className="h-full atomx-gradient transition-all duration-300 ease-out"
            style={{ width: `${scrollProgress}%` }}
          />
        </div>
        
        <Header scrollToSection={scrollToSection} scrollToTop={scrollToTop} activeSection={activeSection} />
        
        <main>
          <Outlet />
        </main>
        
        <Footer />
        
        <button
          onClick={scrollToTop}
          className={`fixed bottom-8 right-8 p-3 atomx-accent text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 z-40 ${
            showBackToTop ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
          }`}
          type="button"
          aria-label="Back to top"
        >
          <ArrowUp className="w-6 h-6" />
        </button>
      </div>
    </CurrencyProvider>
  )
}

function IndexComponent() {
  return (
    <>
      <HeroSection />
      <ComparisonSection />
      <HowItWorksSection />
      <FAQSection />
      <TestimonialsSection />
      <ResourcesSection />
    </>
  )
}

function ResourcesPageComponent() {
  const { blog } = content
  const isMobile = useIsMobile()

  // Scroll to top when component mounts
  useEffect(() => {
    if (window.lenis) {
      window.lenis.scrollTo(0, { duration: 0.5 })
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }, [])

  // Safely get blog posts with fallback
  const blogPosts = blog?.posts?.filter(post => post && post.id) || []

  return (
    <div className="min-h-screen bg-gray-50 py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className={`font-bold text-black ${
            isMobile ? 'text-3xl mb-4' : 'text-5xl mb-6'
          }`}>
            Resources & Insights
          </h1>
          <p className={`text-gray-600 max-w-3xl mx-auto ${
            isMobile ? 'text-base' : 'text-lg'
          }`}>
            Stay updated with the latest insights, case studies, and thought leadership in blockchain payments and cross-border remittances.
          </p>
        </div>

        <div className="max-w-7xl mx-auto">
          <div className={`grid gap-6 ${
            isMobile 
              ? 'grid-cols-1' 
              : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
          }`}>
            {blogPosts.map((post, index) => (
              <BlogCard 
                key={post.id} 
                post={post} 
                variant={index === 0 ? 'featured' : 'default'}
                className={index === 0 && !isMobile ? 'md:col-span-2' : ''}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

function BlogPostComponent() {
  const { postId } = useParams({ from: '/resources/$postId' })
  const { blog } = content
  const isMobile = useIsMobile()

  // Scroll to top when component mounts or postId changes
  useEffect(() => {
    if (window.lenis) {
      window.lenis.scrollTo(0, { duration: 0.5 })
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }, [postId])

  // Safely find the post
  const post = blog?.posts?.find(p => p && p.id === postId)

  if (!post) {
    return (
      <div className="min-h-screen bg-gray-50 py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Post Not Found</h1>
          <p className="text-gray-600 mb-8">The resource you're looking for doesn't exist.</p>
          <Link
            to="/resources"
            className="inline-flex items-center text-primary hover:text-accent font-semibold"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Resources
          </Link>
        </div>
      </div>
    )
  }

  const getCategoryStyle = (category: string) => {
    switch (category.toLowerCase()) {
      case 'podcast':
        return 'bg-purple-600 text-white';
      case 'case study':
        return 'bg-blue-600 text-white';
      case 'article':
      default:
        return 'bg-gray-600 text-white';
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="relative h-96 overflow-hidden">
        <img
          src={post.image}
          alt={post.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-black/20" />
        
        <div className="absolute top-6 left-6">
          <Link
            to="/resources"
            className="inline-flex items-center bg-white/90 backdrop-blur-sm text-gray-900 px-4 py-2 rounded-lg font-medium hover:bg-white transition-colors duration-300 shadow-lg"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Resources
          </Link>
        </div>

        <div className="absolute top-6 right-6">
          <span className={`inline-block px-4 py-2 text-sm font-bold uppercase tracking-wide rounded-lg ${getCategoryStyle(post.category)}`}>
            {post.category}
          </span>
        </div>
      </div>

      <div className="container mx-auto px-4 -mt-16 relative z-10">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-xl shadow-xl p-8 mb-8">
            <h1 className={`font-bold text-gray-900 leading-tight mb-6 ${
              isMobile ? 'text-2xl' : 'text-4xl'
            }`}>
              {post.title}
            </h1>

            <div className="flex flex-wrap items-center gap-6 text-gray-600 text-sm mb-6">
              <div className="flex items-center">
                <Calendar className="w-4 h-4 mr-2" />
                <time dateTime={post.date}>{post.date}</time>
              </div>
              <div className="flex items-center">
                <Clock className="w-4 h-4 mr-2" />
                <span>{post.readTime}</span>
              </div>
              <div className="flex items-center">
                <Tag className="w-4 h-4 mr-2" />
                <span>{post.category}</span>
              </div>
            </div>

            <p className={`text-gray-600 leading-relaxed border-l-4 border-primary pl-6 italic ${
              isMobile ? 'text-base' : 'text-lg'
            }`}>
              {post.excerpt}
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-8">
            <div className="prose prose-lg max-w-none">
              <div 
                className="space-y-6 text-gray-700 leading-relaxed"
                dangerouslySetInnerHTML={{ __html: post.content }}
              />
            </div>

            <div className="border-t border-gray-200 pt-8 mt-8">
              <div className="text-center">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  Ready to experience blockchain-powered transfers?
                </h3>
                <button className="bg-primary text-white px-8 py-3 rounded-lg font-semibold hover:bg-primary/90 transition-colors duration-300 shadow-lg hover:shadow-xl">
                  Get Started with AtomX Pay
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

const rootRoute = createRootRoute({
  component: RootComponent,
})

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: IndexComponent,
})

const resourcesRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/resources',
  component: ResourcesPageComponent,
})

const blogPostRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/resources/$postId',
  component: BlogPostComponent,
})

const routeTree = rootRoute.addChildren([
  indexRoute,
  resourcesRoute,
  blogPostRoute,
])

export const router = createRouter({ 
  routeTree,
  defaultPreload: 'intent'
})

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}