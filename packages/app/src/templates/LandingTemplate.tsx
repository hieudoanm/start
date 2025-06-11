import { Footer } from '@start/components/common/Footer/Footer';
import { RadialGradientBackground } from '@start/components/common/RadialGradientBackground';
import { CallToAction } from '@start/components/landing/CallToAction';
import { Demo } from '@start/components/landing/Demo';
import { Features } from '@start/components/landing/Features';
import { FrequentlyAskedQuestions } from '@start/components/landing/FrequentlyAskedQuestions';
import { Hero } from '@start/components/landing/Hero';
import { Navbar } from '@start/components/landing/Navbar';
import { Testimonials } from '@start/components/landing/Testimonials';
import { FC } from 'react';

export const LandingTemplate: FC = () => {
	const landing = {
		hero: {
			description:
				'Kickstart your SaaS faster with secure authentication and hassle-free subscription payments powered by Paddle.',
		},
		features: {
			title: 'Features',
			description:
				'Everything you need to launch and scale your start SaaS — zero boilerplate, maximum speed.',
			features: {
				authentication: {
					emoji: '🔑',
					title: 'Complete User Authentication',
					description:
						'Secure sign-up, login, and password recovery built-in. Focus on your product — not reinventing login screens.',
				},
				email: {
					emoji: '✉️',
					title: 'Integrated Email Delivery',
					description:
						'Send transactional emails like verification and password resets with Resend — reliable delivery, zero hassle.',
				},
				payment: {
					emoji: '🚀',
					title: 'Seamless Paddle Payments',
					description:
						'Integrated subscription billing with Paddle — global taxes, compliance, and invoicing handled for you.',
				},
			},
		},
		demo: {
			title: 'How to Use',
			description: 'See it in action — your SaaS, ready to launch in minutes.',
		},
		testimonials: {
			quote:
				'"This template saved me weeks of boring setup work. I had my app accepting payments on day one! Highly recommended for solo founders and indie hackers."',
			source: 'Alex M, Indie Hacker',
		},
		faq: {
			title: 'Frequently Asked Questions',
			description:
				"Got questions? We've got answers to help you launch with confidence.",
			questions: {
				'paddle-account': {
					question: 'Do I need a Paddle account to use this template?',
					answer:
						"Yes - you'll need a free Paddle vendor account to connect your product and handle subscription payments.",
				},
				teckstack: {
					question: 'Which tech stack does this template use?',
					answer:
						'This starter kit uses a modern stack: Next.js (or your preferred framework), Prisma for database access, secure API routes, and Paddle for payments.',
				},
				customization: {
					question: 'Can I add custom features later?',
					answer:
						'Absolutely. The template is designed to be modular and extensible — you can easily add new pages, APIs, roles, or billing logic as your SaaS grows.',
				},
				tax: {
					question: 'Does it handle taxes and EU VAT?',
					answer:
						'Yes! Paddle acts as your Merchant of Record and takes care of VAT, taxes, and invoicing — saving you legal and accounting headaches.',
				},
				deployment: {
					question: 'Is there a deployment guide?',
					answer:
						'Yes — the README includes clear steps to deploy on Vercel, Fly.io, or any Node-compatible host.',
				},
			},
		},
		cta: {
			title: 'Get Started for Free',
			description:
				'Join today and see how quickly you can launch your start SaaS. Sign up in seconds — no credit card required.',
			action: 'Sign Up Now',
		},
	};

	return (
		<div className="scrollbar-none flex h-screen flex-col gap-y-8 overflow-y-auto md:gap-y-16">
			<RadialGradientBackground />
			<Navbar />
			<main className="flex flex-col gap-y-8 md:gap-y-16">
				<Hero description={landing.hero.description} />
				<div className="flex flex-col gap-y-8 md:gap-y-16">
					<Features
						title={landing.features.title}
						description={landing.features.description}
						features={landing.features.features}
					/>
					<Demo
						title={landing.demo.title}
						description={landing.demo.description}
					/>
					<Testimonials
						quote={landing.testimonials.quote}
						source={landing.testimonials.quote}
					/>
					<FrequentlyAskedQuestions
						title={landing.faq.title}
						description={landing.faq.description}
						questions={landing.faq.questions}
					/>
					<CallToAction
						title={landing.cta.title}
						description={landing.cta.description}
						action={landing.cta.action}
					/>
				</div>
			</main>
			<Footer />
		</div>
	);
};
