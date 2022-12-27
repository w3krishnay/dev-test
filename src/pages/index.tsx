import { Meta } from '@/layouts/Meta';
import { Main } from '@/templates/Main';
import Link from 'next/link';

const Index = () => {
  return (
    <Main
      meta={
        <Meta
          title="Next.js Checkout"
          description="Donec rutrum congue leo eget malesuada. Vivamus suscipit tortor eget felis porttitor volutpat. Proin eget tortor risus. Nulla porttitor accumsan tincidunt."
        />
      }
    >
      <div className='min-h-[80vh] pt-20 text-center'>
      <h1 className="text-2xl font-bold">
        Checkout Dev Test(Next JS)
      </h1>
     <Link href={"/login"} title="Click to login">Login Now to Continue</Link>
     </div>
    </Main>
  );
};

export default Index;
