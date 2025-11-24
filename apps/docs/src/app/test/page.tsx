import {
  Footer,
  Header,
  SideNavigation,
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
  Container,
  SAMPLE_SIDE_NAVIGATION,
  SkipLink,
} from '@hanui/react';

export default function TestPage() {
  return (
    <div id="wrap" className="flex flex-col min-h-screen">
      <SkipLink
        links={[
          { href: '#header', label: 'Skip to header' },
          { href: '#main', label: 'Skip to main content' },
          { href: '#footer', label: 'Skip to footer' },
        ]}
      />
      <Header />
      <main className="flex-1">
        <Container className="flex justify-between gap-20">
          <SideNavigation
            title="1Depth-title"
            sections={SAMPLE_SIDE_NAVIGATION}
          />
          <div className="grow">
            <Accordion>
              <AccordionItem value="item-1">
                <AccordionTrigger>Section 1</AccordionTrigger>
                <AccordionContent>Content 1</AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger>Section 2</AccordionTrigger>
                <AccordionContent>Content 2</AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3">
                <AccordionTrigger>Section 3</AccordionTrigger>
                <AccordionContent>Content 3</AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </Container>
      </main>
      <Footer />
    </div>
  );
}
