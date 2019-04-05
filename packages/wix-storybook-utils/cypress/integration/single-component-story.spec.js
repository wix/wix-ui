/* global cy */

const makeUrl = kind => story =>
  `http://localhost:6006/iframe.html?selectedKind=${kind}&selectedStory=${window.encodeURIComponent(
    story,
  )}`;

const kind = 'Components';
const story = 'Single Component Story';

const byHook = hook => cy.get(`[data-hook=${hook}]`);
const get = byHook;

context(story, () => {
  beforeEach(() => {
    cy.visit(makeUrl(kind)(story));
  });

  it('should have title', () => {
    // get('header-component').should('have.text', 'Oh hello there!');

    cy.contains('Single Component Story');
    cy.contains(
      "import DummyComponent from 'wix-storybook-utils/DummyComponent';",
    );

    cy.contains('Component Description from source!');
    cy.contains(`[class*=styles__preview__]`, /Hello dummy component!/);

    cy.get('input[type=number]')
      .eq(0)
      .clear()
      .type('1234');

    cy.contains('the number is 1234');

    cy.get('input[type=number]')
      .eq(1)
      .clear()
      .type('4321');

    cy.contains('this value is set only when mounted or remount: 17');

    cy.contains('Remount Component')
      .scrollIntoView()
      .click();

    cy.contains('this value is set only when mounted or remount: 4321');

    cy.contains('undefinedValueProp');
  });
});
