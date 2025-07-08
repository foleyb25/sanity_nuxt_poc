import { defineQuery } from "groq";

const linkReference = /* groq */ `
_type == "link" => {
	"page": page->slug.current,
	"post": post->slug.current
}
`;

const linkFields = /* groq */ `
link {
	...,
	${linkReference}
	}
`;

export const postsQuery =
  defineQuery(`*[_type == "post"] | order(date desc, _updatedAt desc) {
		...,
		author->{
			...
		  }
	}`);

export const somePostsQuery = defineQuery(/* groq */ `
*[_type == "post" && slug.current != $skip &&
(
  !$byAuthor || author._ref == $authorId
)
][0...$limit] | order(date desc, _updatedAt desc) {
	...,
	author->{
		...
	  }
}`);

export const pageQuery = defineQuery(/* groq */ `
		*[_type == "page" && defined(slug.current) && slug.current == $slug][0]{
			...,
			"pageBuilder": pageBuilder[]{
				...,
				_type == "callToAction" => {
					${linkFields},
				},
				_type == "infoSection" => {
					content[]{
						...,
						markDefs[]{
							...,
							_type == "link" => {
								"link": {
									...,
									${linkReference}
								}
							},
						}
					}
				},
			}
		}`);

export const postQuery = defineQuery(/* groq */ `
		*[_type == "post" && defined(slug.current) && slug.current == $slug][0]{
			...,
			content[]{
						...,
						markDefs[]{
							...,
							_type == "link" => {
								"link": {
									...,
									${linkReference}
								}
							},
						}
					},
			author->{
				...
				}
		}`);

export const getRecommendedAuthorPosts = defineQuery(/* groq */ `
		*[_type == "post" && author._ref == $authorId && _id != $postId ] | order(date desc, _updatedAt desc)[0...10] {
			...
		}`);

		

export const settingsQuery = defineQuery(/* groq */ `
		*[_type == "settings"][0]{
			title,
			description[]{
						...,
						markDefs[]{
							...,
							_type == "link" => {
								"link": {
									...,
									${linkReference}
								}
							},
						}
					},
			"ogImage": ogImage.asset->url
		}`);
