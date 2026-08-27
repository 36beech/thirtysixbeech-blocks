/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-i18n/
 */
import { __ } from "@wordpress/i18n";

/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/#useblockprops
 */
import { useBlockProps, RichText } from "@wordpress/block-editor";

/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * Those files can contain any CSS code that gets applied to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import "./editor.scss";

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#edit
 *
 * @return {Element} Element to render.
 */

const famousQuotes = [
	{
		quote: "You must do the thing you think you cannot do.",
		author: "Eleanor Roosevelt",
		title: "Diplomat",
	},
	{
		quote: "Stay hungry, stay foolish.",
		author: "Stewart Brand",
		title: "Writer",
	},
	{
		quote: "The unexamined life is not worth living.",
		author: "Socrates",
		title: "Philosopher",
	},
	{
		quote:
			"Success is liking yourself, liking what you do, and liking how you do it.",
		author: "Maya Angelou",
		title: "Poet",
	},
	{
		quote: "That's one small step for man, one giant leap for mankind.",
		author: "Neil Armstrong",
		title: "Astronaut",
	},
	{
		quote:
			"I am no longer accepting the things I cannot change. I am changing the things I cannot accept.",
		author: "Angela Davis",
		title: "Activist",
	},
	{
		quote: "To be, or not to be, that is the question.",
		author: "William Shakespeare",
		title: "Playwright",
	},
	{
		quote: "The function of freedom is to free someone else.",
		author: "Yuri Kochiyama",
		title: "Activist",
	},
	{
		quote: "Remember that you are all people and that all people are you.",
		author: "Joy Harjo",
		title: "Poet",
	},
	{
		quote:
			"The most difficult thing is the decision to act, the rest is merely tenacity.",
		author: "Amelia Earhart",
		title: "Aviator",
	},
	{
		quote: "I think, therefore I am.",
		author: "René Descartes",
		title: "Philosopher",
	},
	{
		quote: "Well-behaved women seldom make history.",
		author: "Laurel Thatcher Ulrich",
		title: "Historian",
	},
	{
		quote: "The only thing we have to fear is fear itself.",
		author: "Franklin D. Roosevelt",
		title: "U.S. President",
	},
	{
		quote: "It always seems impossible until it's done.",
		author: "Nelson Mandela",
		title: "Political Leader",
	},
	{
		quote: "I have a dream.",
		author: "Martin Luther King Jr.",
		title: "Civil Rights Leader",
	},
	{
		quote: "Do what you can, with what you have, where you are.",
		author: "Theodore Roosevelt",
		title: "U.S. President",
	},
	{
    quote: "People have to learn to hate, and if they can learn to hate, they can be taught to love.",
    author: "Coretta Scott King",
    title: "Civil Rights Leader"
  },
  {
    quote: "I raise up my voice—not so I can shout, but so that those without a voice can be heard.",
    author: "Malala Yousafzai",
    title: "Activist"
  },
  {
    quote: "You can't use up creativity. The more you use, the more you have.",
    author: "Maya Angelou",
    title: "Poet"
  }
];

const i = Math.floor(Math.random() * 19);
export default function Edit({ attributes, setAttributes }) {
	const { quote, author, authorTitle } = attributes;
	const quoteEmpty = (!quote && !author && !authorTitle);
console.log(quoteEmpty);
	return (
		<blockquote {...useBlockProps({className: "tsb-testimonial"})}>
			<div className="tsb-testimonial__text">
				<RichText
					placeholder={quoteEmpty ? famousQuotes[i].quote : __("Testimonial lorem ipsum dolor sit amet eu commodo platea.")}
					value={quote}
					onChange={(newValue) => setAttributes({ quote: newValue })}
				/>
			</div>
			<div className="tsb-testimonial__author">
				<span className="tsb-testimonial__author-name">
					<RichText
						placeholder={quoteEmpty ? famousQuotes[i].author : __("Firstname Lastname")}
						value={author}
						allowedFormats={[]}
						multiline={false}
						onChange={(newValue) => setAttributes({ author: newValue })}
					/>
				</span>
				<span className="tsb-testimonial__author-title">
					<RichText
						placeholder={quoteEmpty ? famousQuotes[i].title : __("Author Title")}
						value={authorTitle}
						allowedFormats={[]}
						multiline={false}
						onChange={(newValue) => setAttributes({ authorTitle: newValue })}
					/>
				</span>
			</div>
		</blockquote>
	);
}
