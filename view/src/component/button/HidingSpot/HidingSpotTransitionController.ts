import {
	AbstractTransitionController,
	IAbstractTransitionComponent,
} from 'vue-transition-component';
import { TimelineMax, Linear, TweenLite } from 'gsap';

export default class HidingSpotTransitionController extends AbstractTransitionController {
	/**
	 * @public
	 * @method showCorrectState
	 */
	public showCorrectState(): Promise<void> {
		return new Promise((resolve: Function) => {
			TweenLite.to(this.parentController.$refs.pinkGlow, 0.05, {
				autoAlpha: 1,
				ease: Linear.easeNone,
			});
			TweenLite.to(this.parentController.$refs.glow, 0.5, {
				autoAlpha: 0.25,
				ease: Linear.easeNone,
			});
			TweenLite.to(this.parentController.$refs.glow, 2, {
				autoAlpha: 0.25,
				ease: Linear.easeNone,
				onComplete: resolve,
			});
		});
	}

	/**
	 * Use this method to setup your transition in timeline
	 *
	 * @protected
	 * @method setupTransitionInTimeline
	 * @param {TimelineMax} timeline The transition in timeline
	 * @param {IAbstractTransitionComponent} parent The reference to the parent controller
	 * @param {string} id The transition id that was provided when constructing the controller
	 */
	protected setupTransitionInTimeline(
		timeline: TimelineMax,
		parent: IAbstractTransitionComponent,
		id: string,
	): void {
		timeline.set(parent.$el, { pointerEvents: 'auto' }, 0);
		timeline.fromTo(parent.$el, 0.5, { opacity: 0 }, { opacity: 1, ease: Linear.easeNone });
	}

	/**
	 * Use this method to setup your transition out timeline
	 *
	 * @protected
	 * @method setupTransitionOutTimeline
	 * @param {TimelineMax} timeline The transition in timeline
	 * @param {IAbstractTransitionComponent} parent The reference to the parent controller
	 * @param {string} id The transition id that was provided when constructing the controller
	 */
	protected setupTransitionOutTimeline(
		timeline: TimelineMax,
		parent: IAbstractTransitionComponent,
		id: string,
	): void {
		timeline.set(parent.$el, { pointerEvents: 'none' }, 0);
		timeline.to(parent.$el, 2, { opacity: 0, ease: Linear.easeNone });
	}

	/**
	 * Use this method to setup your looping timeline
	 *
	 * @protected
	 * @method setupLoopingAnimationTimeline
	 * @param {TimelineMax} timeline The transition in timeline
	 * @param {IAbstractTransitionComponent} parent The reference to the parent controller
	 * @param {string} id The transition id that was provided when constructing the controller
	 */
	protected setupLoopingAnimationTimeline(
		timeline: TimelineMax,
		parent: IAbstractTransitionComponent,
		id: string,
	): void {
		if (!(parent as any).showWhiteOutline) return;

		timeline.to(parent.$refs.glow, 1, { opacity: 0.5, ease: Linear.easeNone });
		timeline.to(parent.$refs.glow, 1, { opacity: 1, ease: Linear.easeNone });
	}
}
