describe('addItemForm', () => {
    it('base example, visually looks correct', async () => {
        await page.goto('http://localhost:9009/iframe.html?path=/story/app--base');
        const image = await page.screenshot();
        expect(image).toMatchImageSnapshot();
    });
});
