import { Hono } from 'hono';
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { decode, sign, verify } from 'hono/jwt'
import { signinInput, signupInput, createPostInput, updatePostInput } from "@wombat123/common-app"
export const postsRouter = new Hono<{
	Bindings: {
		DATABASE_URL: string,
		JWT_SECRET: string
	},
	Variables:{
		userId : string
	}
}>();

postsRouter.use("/*",async(c,next)=>{
	const authheader=c.req.header("Authorization")||" ";
	
	const success=await verify(authheader,c.env.JWT_SECRET);
	if(!success){
		c.status(403);
		return c.json({msg: "Unauthorized user"})
	}
	//@ts-ignore
	c.set('userId',success.id);
	await next();
})

postsRouter.get('/bulk',async (c) => {
	const prisma = new PrismaClient({
		datasourceUrl: c.env?.DATABASE_URL,
	}).$extends(withAccelerate());
	
	const posts=await prisma.post.findMany({
		select:{
			content:true,
			title:true,
			id:true,
			author:{
				select:{
					name:true
				}
			}
		}
	})
	return c.json(posts);

})

postsRouter.get('/:id', async (c) => {
	const id = c.req.param('id');
	const prisma = new PrismaClient({
		datasourceUrl: c.env?.DATABASE_URL	,
	}).$extends(withAccelerate());
	
	try{
		const post = await prisma.post.findUnique({
			where: {
				id: id
			},
			select:{
				id:true,
				title:true,
				content:true,
				author:{
					select:{
						name:true
					}
				}
			}
		});
	
		return c.json(post);

	}
	catch{
		c.status(403);
		return c.json({msg:"Invalid Post"})
	}
	
})

postsRouter.post('/',async (c) => {
		const prisma = new PrismaClient({
		datasourceUrl: c.env?.DATABASE_URL,
	}).$extends(withAccelerate());

	const body=await c.req.json();
    const userId=c.get("userId");
	const { success } = createPostInput.safeParse(body);
	if (!success) {
		c.status(400);
		return c.json({ error: "invalid input" });
	}

	const post=await prisma.post.create({
		data:{
			title:body.title,
			content:body.content,
			authorId:userId

		}
	})
	return c.json({id:post.id});
})

postsRouter.put('/',async (c) => {
	const prisma = new PrismaClient({
		datasourceUrl: c.env?.DATABASE_URL,
	}).$extends(withAccelerate());
	const userId=c.get("userId");

	const body=await c.req.json();
	const { success } = updatePostInput.safeParse(body);
	if (!success) {
		c.status(400);
		return c.json({ error: "invalid input" });
	}
	await prisma.post.update({
		where:{
			id:body.id,
			authorId: userId
		},
		data:{
			title:body.title,
			content:body.content
		}
	})
	return c.text("Post updated");
})