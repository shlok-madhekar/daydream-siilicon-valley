<script lang="ts">
	import { onMount } from 'svelte';

	function setupScrollAnimations() {
		console.log('Setting up scroll animations...');

		// Add class to indicate JS is loaded
		document.documentElement.classList.add('js-loaded');
		console.log('Added js-loaded class to document');

		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						entry.target.classList.add('animate-in');
						console.log('Element animated in:', entry.target.className);
					}
				});
			},
			{
				threshold: 0.1,
				rootMargin: '0px 0px -20px 0px'
			}
		);

		// Setup observer
		const setupObserver = () => {
			const elements = document.querySelectorAll('.scroll-reveal');
			console.log('Found scroll-reveal elements:', elements.length);

			elements.forEach((el, index) => {
				console.log(`Observing element ${index}:`, el.tagName, el.className);
				observer.observe(el);
			});

			return elements.length > 0;
		};

		// Try immediately
		if (!setupObserver()) {
			// Try again after DOM is ready
			setTimeout(() => {
				setupObserver();
			}, 100);
		}
	}

	onMount(() => {
		setupScrollAnimations();
	});
</script>

<svelte:head>
	<title>Animation Test - Daydream SV</title>
</svelte:head>

<div class="min-h-screen bg-gradient-to-b from-blue-50 to-blue-100">
	<!-- Initial viewport content -->
	<div class="h-screen flex items-center justify-center">
		<div class="text-center">
			<h1 class="text-6xl font-bold text-blue-800 mb-8">Animation Test</h1>
			<p class="text-xl text-blue-600">Scroll down to see the animations</p>
			<div class="mt-8 text-4xl animate-bounce">⬇️</div>
		</div>
	</div>

	<!-- Test elements that should animate in -->
	<div class="py-32 space-y-32">
		<div class="max-w-4xl mx-auto px-8">
			<div class="scroll-reveal bg-white p-12 rounded-3xl shadow-lg text-center">
				<h2 class="text-4xl font-bold text-gray-800 mb-4">First Animation</h2>
				<p class="text-xl text-gray-600">This should fade in and slide up when it comes into view</p>
			</div>
		</div>

		<div class="max-w-4xl mx-auto px-8">
			<div class="scroll-reveal bg-green-100 p-12 rounded-3xl shadow-lg text-center">
				<h2 class="text-4xl font-bold text-green-800 mb-4">Second Animation</h2>
				<p class="text-xl text-green-600">This should also animate with a slight delay</p>
			</div>
		</div>

		<div class="max-w-4xl mx-auto px-8">
			<div class="grid md:grid-cols-2 gap-8">
				<div class="scroll-reveal bg-purple-100 p-8 rounded-2xl shadow-lg">
					<h3 class="text-2xl font-bold text-purple-800 mb-4">Card 1</h3>
					<p class="text-purple-600">Multiple elements should animate in sequence</p>
				</div>
				<div class="scroll-reveal bg-red-100 p-8 rounded-2xl shadow-lg">
					<h3 class="text-2xl font-bold text-red-800 mb-4">Card 2</h3>
					<p class="text-red-600">With staggered timing for visual appeal</p>
				</div>
			</div>
		</div>

		<div class="max-w-4xl mx-auto px-8">
			<div class="scroll-reveal bg-yellow-100 p-12 rounded-3xl shadow-lg text-center">
				<h2 class="text-4xl font-bold text-yellow-800 mb-4">Final Test</h2>
				<p class="text-xl text-yellow-600">If you can see this animating, the system works!</p>
			</div>
		</div>
	</div>

	<!-- More content to enable scrolling -->
	<div class="h-screen flex items-center justify-center bg-gray-800 text-white">
		<div class="text-center">
			<h2 class="text-4xl font-bold mb-4">End of Test</h2>
			<p class="text-xl">All animations should have triggered by now</p>
		</div>
	</div>
</div>

<style>
	/* Scroll reveal animations - start visible for accessibility */
	:global(.scroll-reveal) {
		opacity: 1;
		transform: translateY(0);
		transition:
			opacity 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94),
			transform 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94);
		will-change: opacity, transform;
	}

	/* Progressive enhancement - only hide if JS is working */
	:global(.js-loaded .scroll-reveal:not(.animate-in)) {
		opacity: 0;
		transform: translateY(40px);
		transition-delay: 0s;
	}

	:global(.scroll-reveal.animate-in) {
		opacity: 1 !important;
		transform: translateY(0) !important;
		transition-delay: inherit;
	}

	/* Staggered animation delays for grid items */
	:global(.scroll-reveal:nth-child(1)) {
		transition-delay: 0.1s;
	}
	:global(.scroll-reveal:nth-child(2)) {
		transition-delay: 0.2s;
	}
	:global(.scroll-reveal:nth-child(3)) {
		transition-delay: 0.3s;
	}
	:global(.scroll-reveal:nth-child(4)) {
		transition-delay: 0.4s;
	}

	/* Reduced motion for accessibility */
	@media (prefers-reduced-motion: reduce) {
		:global(.scroll-reveal) {
			animation: none;
			transition: none;
			opacity: 1 !important;
			transform: none !important;
		}
	}
</style>
