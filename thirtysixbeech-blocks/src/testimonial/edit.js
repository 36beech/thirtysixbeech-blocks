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
		quote: "The only thing we have to fear is fear itself.",
		author: "Franklin D. Roosevelt",
		title: "32nd President of the United States",
	},
	{
		quote: "I think, therefore I am.",
		author: "René Descartes",
		title: "Philosopher and Mathematician",
	},
	{
		quote: "That's one small step for man, one giant leap for mankind.",
		author: "Neil Armstrong",
		title: "Astronaut",
	},
	{
		quote: "In the beginning God created the heavens and the earth.",
		author: "The Bible",
		title: "Religious Text",
	},
	{
		quote: "To be, or not to be, that is the question.",
		author: "William Shakespeare",
		title: "Playwright and Poet",
	},
	{
		quote: "I have a dream.",
		author: "Martin Luther King Jr.",
		title: "Civil Rights Leader",
	},
	{
		quote: "The unexamined life is not worth living.",
		author: "Socrates",
		title: "Philosopher",
	},
	{
		quote: "Stay hungry, stay foolish.",
		author: "Steve Jobs",
		title: "Co-founder of Apple",
	},
	{
		quote: "It always seems impossible until it's done.",
		author: "Nelson Mandela",
		title: "Former President of South Africa",
	},
	{
		quote: "Do what you can, with what you have, where you are.",
		author: "Theodore Roosevelt",
		title: "26th President of the United States",
	},
];

const i = Math.floor(Math.random() * 10);

export default function Edit({ attributes, setAttributes }) {
	const { quote, author, authorTitle } = attributes;
	return (
		<blockquote {...useBlockProps()}>
			<div className="tsb-quote-text">
				<RichText
					placeholder={famousQuotes[i].quote}
					value={quote}
					onChange={(newValue) => setAttributes({ quote: newValue })}
				/>
			</div>
			<div className="tsb-quote-author">
				<span className="tsb-quote-author--name">
				<RichText
					placeholder={famousQuotes[i].author}
					value={author}
					allowedFormats={[]}
					multiline={false}
					onChange={(newValue) => setAttributes({ author: newValue })}
				/></span><span className="tsb-quote-author--title">
				<RichText
					placeholder={famousQuotes[i].title}
					value={authorTitle}
					allowedFormats={[]}
					multiline={false}
					onChange={(newValue) => setAttributes({ authorTitle: newValue })}
				/></span>
			</div>
		</blockquote>
	);
}
