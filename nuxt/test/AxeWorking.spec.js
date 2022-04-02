const { axe, toHaveNoViolations } = require('jest-axe')

expect.extend(toHaveNoViolations)

describe('Axe is working', () => {
  it('should demonstrate this matcher`s usage', async () => {
    const render = () => '<img src="#"/>'

    // pass anything that outputs html to axe
    const html = render()

    // NB: Have flipped this as this test should
    // pass despite actual violations
    expect(await axe(html)).not.toHaveNoViolations()
  })
})
