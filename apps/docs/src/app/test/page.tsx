import {
  Footer,
  Header,
  SideNavigation,
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
  Container,
} from '@hanui/react';

export default function TestPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        <Container>
          <SideNavigation title="SideNavigation" sections={[]} />
          <div className="p-8">
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
