import {
	AbstractTransitionController,
	IAbstractTransitionComponent,
	TransitionDirection,
} from 'vue-transition-component';
import { TimelineMax, Linear } from 'gsap';

export default class ChooseHidingTypeTransitionController extends AbstractTransitionController {
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
		timeline.fromTo(
			parent.$el,
			0.1,
			{ pointerEvents: 'none' },
			{ pointerEvents: 'all', ease: Linear.easeNone },
		);
		timeline.add(this.getTimeline('speechBubble', TransitionDirection.IN), 0);
		timeline.add(this.getTimeline('characterAnimation', TransitionDirection.IN), 0);
		timeline.add(this.getTimeline('autoButton', TransitionDirection.IN), 0.8);
		timeline.add(this.getTimeline('manualButton', TransitionDirection.IN), 1);
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
		timeline.add(this.getTimeline('speechBubble', TransitionDirection.OUT), 0);
		timeline.add(this.getTimeline('autoButton', TransitionDirection.OUT), 0);
		timeline.add(this.getTimeline('manualButton', TransitionDirection.OUT), 0.1);
		timeline.add(this.getTimeline('characterAnimation', TransitionDirection.OUT), 0);
		timeline.to(parent.$el, 0.1, { pointerEvents: 'none', ease: Linear.easeNone });
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
	): void {}
}
