<template>
	<!-- eslint-disable -->
	<header 
		class="f-header js-f-header bg-white margin-bottom-md padding-y-sm"
		:class="{'fixed': isFixed}"
	>
		<div class="f-header__mobile-content container max-width-lg">
			<a :href="logo.url" class="f-header__logo">
				<img :src="logo.img" alt="logo">
			</a>

			<a
				class="reset anim-menu-btn js-anim-menu-btn f-header__nav-control js-tab-focus bg-none has-no-border"
				aria-label="Toggle menu"
				@click.prevent=""
			>
				<i
					class="anim-menu-btn__icon anim-menu-btn__icon--close"
					aria-hidden="true"
				></i>
			</a>
		</div>

		<div class="f-header__nav" role="navigation">
			<div
				class="f-header__nav-grid justify-between@md container max-width-lg flex-column flex-row@lg justify-content-center"
			>
				<div class="f-header__nav-logo-wrapper flex-grow flex-basis-0 hide@md">
					<a :href="logo.url" class="f-header__logo">
						<img :src="logo.img" alt="logo">
					</a>
				</div>

				<!-- navbar list -->
				<ul
					class="f-header__list flex-grow flex-basis-0 justify-center@md margin-bottom-xs margin-bottom-0@lg flex-wrap"
				>
					<li 
						class="f-header__item margin-right-md@md"
						v-for="(item, index) in navList"
						:key="`f-header__item${index}`"
					>
						<a :href="item.url" :aria-current="item.active && 'page'" class="f-header__link font-weight-bold d-flex justify-content-between">
							<span>{{ item.name }}</span>

							<div 
								v-if="item.subMenu"
								class="f-header__dropdown-icon-box border@md border-default margin-left-sm d-flex align-items-center justify-content-center rounded-circle" 
								@click.prevent="handleOpenSubMenu(`f-header__item${index}`)"
							>
								<svg 
									width="8" 
									height="6" 
									viewBox="0 0 8 6" 
									fill="none" 
									xmlns="http://www.w3.org/2000/svg"
									aria-hidden="true"
									class="f-header__dropdown-icon margin-left-0 margin-top-xxxxs"
									:class="{ 'active' : activeList.find(item => item == `f-header__item${index}`) }"
								>
									<path d="M1 1L4 4L7 1" stroke="#1F1E1E" stroke-width="2" stroke-linecap="round"/>
								</svg>
							</div>
						</a>

						<ul 
							class="f-header__dropdown padding-xs@md"
							:class="{ 'active' : activeList.find(item => item == `f-header__item${index}`) }"
							v-if="item.subMenu"
						>
							<li
								v-for="(subItem, subItemIndex) in item.subMenu"
								:key="subItemIndex"
							>
								<a :href="subItem.url" class="text-sm f-header__dropdown-link rounded font-weight-bold">
									{{ subItem.name }}
								</a>
							</li>
						</ul>
					</li>
				</ul>
				<!-- navbar list -->

				<!-- social navbar -->
				<ul
					class="f-header__list flex-grow flex-basis-0 justify-end@md margin-left-auto@lg d-flex align-items-center margin-bottom-xs margin-bottom-0@lg"
				>
					<li v-if="hasSearchbar">
						<search-expand
							form-action='/abc'
						/>
					</li>

					<li 
						v-for="(itemSocial, index) in socialItems"	
						:key="index"
						:class="['f-header__item has-no-border', { 'margin-right-md margin-right-sm@md' : index + 1 != socialItems.length }]"
					>
						<a
							:href="itemSocial.url"
							class="f-header__link f-header__link--icon padding-y-md padding-y-0@md"
							aria-label="Follow us on Social App"
						>
							<img :src="itemSocial.img" alt="social-icon">
						</a>
					</li>

				</ul>
				<!-- social navbar -->
			</div>
		</div>
	</header>
</template>

<script>
import SearchExpand from '@/components/Utilities/SearchExpand';

export default {
	name: 'CsNavbar',
	components: {
		SearchExpand,
	},
	props: {
		socialItems: {
			type: Array,
			default: () => []
		},
		navList: {
			type: Array,
			default: () => [],
			required: true
		},
		logo: {
			type: Object,
			default: () => {},
			required: true
		},
		hasSearchbar: {
			type: Boolean,
			default: false
		}
	},
	data() {
		return {
			activeList: [],
			isFixed: null,
			isScrolled: null,
		}
	},
	mounted () {
		setTimeout(() => {
			this.stickyNavbar();

			window.addEventListener('resize', () => {
				this.stickyNavbar();
			})
		}, 0)
	},
	methods: {
		stickyNavbar() {
			const navbarOffsetTop = document.querySelector('.f-header').offsetTop;

			// Unfloating navbar when resize to mobile
			if (this.$root.isMobile) this.isFixed = false;

			// handle floating navbar
			window.addEventListener('scroll', () => {
				const wScroll = window.scrollY;

				if (!this.$root.isMobile) {
					this.isFixed = wScroll >= (navbarOffsetTop - 50) ? true : false;
				} else this.isFixed = false;
			})
		},
		handleOpenSubMenu(activeItem) {
			if (window.innerWidth > 768) return;
			const activeItemIndex = this.activeList.indexOf(activeItem);

			activeItemIndex == -1 ?
				this.activeList.push(activeItem) :
				this.activeList.splice(activeItemIndex,  1);
		}
	},
};
</script>

<style lang="scss" scoped>
	.f-header {
		&.fixed {
			position: fixed;
			top: 0;
			left: 0;
			width: 100%;
			// z-index: 10;
			animation: slidedown .5s ease-in-out forwards;
			box-shadow: 0 1px 2px rgba(0, 0, 0, 0.085), 0 1px 8px rgba(0, 0, 0, 0.1);
		}

		@keyframes slidedown {
			from { top: -100px; }
			to { top: 0; }
		}
	}

	.f-header__dropdown-icon-box {
		width: 24px;
		height: 24px;
	}

	.f-header__dropdown {
		pointer-events: none;
		z-index: 100;

		&.active {
			opacity: 1;
			max-height: unset;
			transition: all .2s ease-in-out;
			pointer-events: all;
		}
	}

	.f-header__item {
		&:hover {
			.f-header__dropdown {
				pointer-events: all;
			}		
		}
	}

	.f-header__dropdown-icon {
		transform-origin: center;
		transition: all .2s ease-in-out;

		&.active {
			transform: rotate(-90deg);
		}
	}
</style>
