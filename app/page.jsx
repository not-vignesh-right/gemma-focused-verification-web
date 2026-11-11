import Hero from '../components/home/Hero';
import Budget from '../components/home/Budget';
import Funnel from '../components/home/Funnel';
import Inspection from '../components/home/Inspection';
import Outcome from '../components/home/Outcome';
import Cost from '../components/home/Cost';
import Receipts from '../components/home/Receipts';

// The overview tells the study as a short story: the digit (hook), the reading budget (tension),
// the funnel (turn), the twenty calls (proof by doing), the result and its interval, the cost,
// and the receipts (trust + invitation).
export default function Overview() {
  return (
    <div className="home">
      <Hero />
      <Budget />
      <Funnel />
      <Inspection />
      <Outcome />
      <Cost />
      <Receipts />
    </div>
  );
}
