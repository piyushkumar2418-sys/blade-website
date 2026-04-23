import { Client } from '@notionhq/client';

/**
 * Blade Media Notion Integration
 * Automatically pushes new applicants to the Notion Database.
 */
export async function pushToNotion(data: { name: string; email: string; phone: string }) {
  const notionToken = process.env.BLADE_NOTION_TOKEN;
  const databaseId = process.env.BLADE_NOTION_DB_ID;

  if (!notionToken || !databaseId) {
    console.warn('Notion integration skipped: Missing credentials.');
    return { success: false, error: 'Missing Notion credentials' };
  }

  const notion = new Client({ auth: notionToken });

  try {
    await notion.pages.create({
      parent: { database_id: databaseId },
      properties: {
        // Name is usually the "title" property in a Notion database
        Name: {
          title: [
            {
              text: {
                content: data.name,
              },
            },
          ],
        },
        Email: {
          email: data.email,
        },
        Phone: {
          phone_number: data.phone,
        },
        Status: {
          select: {
            name: 'New Application',
          },
        },
      },
    });

    return { success: true };
  } catch (error: any) {
    console.error('Notion Error:', error);
    return { success: false, error: error.message };
  }
}
