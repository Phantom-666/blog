import { Box, Container } from "@radix-ui/themes"

export default function Home() {
  return (
    <>
      <div className="h-screen">
        <Box>
          <Container size="2">
            <div className="flex justify-center pt-8">
              <div className="text-center">
                <h2 className="text-3xl font-bold text-gray-800">WELCOME</h2>
              </div>
            </div>

            <div className="flex justify-center mt-8">
              <div className="max-w-lg px-4">
                <p className="text-lg text-gray-700 leading-relaxed">
                  Our blog is a showcase of the latest and most progressive
                  technologies in web development. We've crafted this platform
                  with a focus on innovation, efficiency, and user experience,
                  utilizing cutting-edge technologies to deliver a seamless and
                  engaging blogging experience.
                </p>
              </div>
            </div>
          </Container>
        </Box>
      </div>
    </>
  )
}
