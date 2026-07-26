import { Container } from "@/components/layout/container";

export default function Loading() {
  return (
    <Container className="flex min-h-[50vh] items-center justify-center py-20">
      <div
        role="status"
        aria-label="Loading"
        className="border-primary/30 border-t-primary size-8 animate-spin rounded-full border-2"
      />
    </Container>
  );
}
