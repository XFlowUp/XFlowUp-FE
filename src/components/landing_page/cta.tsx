import {Button} from '@/components/ui/button';
import {ScrollAnimation} from '../animations/scroll-animation';

export default function CTA() {
    return (
        <div className="flex w-full items-center justify-center border-t">
            <section className="container flex flex-col items-center justify-center px-4 py-24 md:px-6 md:py-32">
                <ScrollAnimation>
                    <div className="flex flex-col items-center space-y-4 text-center">
                        <h2 className="font-bold text-3xl leading-[1.1] sm:text-3xl md:text-5xl">
                            Ready to revolutionize your business?
                        </h2>
                        <p className="max-w-[42rem] leading-normal text-muted-foreground sm:text-xl sm:leading-8 mx-auto">
                            Join leading companies who trust Amane Soft to drive their digital transformation and
                            stay ahead in the rapidly evolving tech landscape.
                        </p>
                        <Button size="lg" className="mt-4">
                            Get Started Today
                        </Button>
                    </div>
                </ScrollAnimation>
            </section>
        </div>
    );
}
