import MouseMoveEffect from "@/components/mouse-move-effect";
import {Header} from "@/components/landing_page/header";
import Hero from "@/components/landing_page/hero";
import Features from "@/components/landing_page/features";
import CTA from "@/components/landing_page/cta";
import Footer from "@/components/landing_page/footer";
import FrameworkSelection from "@/components/landing_page/framework-selection";


export default function Home() {
    return (
        <div className="flex flex-col min-h-screen">
            <MouseMoveEffect/>
            {/* Background gradients */}
            <div className="pointer-events-none fixed inset-0">
                <div className="absolute inset-0 bg-gradient-to-b from-background via-background/90 to-background"/>
                <div className="absolute right-0 top-0 h-[500px] w-[500px] bg-blue-500/10 blur-[100px]"/>
                <div className="absolute bottom-0 left-0 h-[500px] w-[500px] bg-purple-500/10 blur-[100px]"/>
            </div>
            <div className="relative z-10">
                <Header/>
                <Hero/>
                <Features/>
                <FrameworkSelection/>
                <CTA/>
                <Footer/>
            </div>
        </div>
    );
}
