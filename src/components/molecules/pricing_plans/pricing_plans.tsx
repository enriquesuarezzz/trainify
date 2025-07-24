import { CheckCircle } from 'lucide-react'

const plans = [
  {
    name: 'Basic',
    price: 29,
    features: [
      '5 classes per month',
      'Access to basic equipment',
      'Locker room access',
      'Mobile app access',
      'Basic progress tracking',
    ],
    buttonText: 'Choose Plan',
    isPopular: false,
  },
  {
    name: 'Premium',
    price: 79,
    features: [
      'Unlimited classes',
      'All equipment access',
      'Personal trainer consultations',
      'Nutrition guidance',
      'Advanced analytics',
      'Priority booking',
      'Guest passes (2/month)',
    ],
    buttonText: 'Get Started',
    isPopular: true,
    badge: 'Save 30%',
  },
  {
    name: 'Elite',
    price: 149,
    features: [
      'Everything in Premium',
      '1-on-1 personal training',
      'Custom meal plans',
      'Recovery sessions',
      'VIP locker room',
      'Unlimited guest passes',
      '24/7 gym access',
    ],
    buttonText: 'Choose Plan',
    isPopular: false,
  },
]

const PricingPlans = () => {
  return (
    <section className="w-full text-center">
      <h2 className="mb-2 text-3xl font-extrabold text-orange-500 md:text-4xl">
        Choose Your Plan
      </h2>
      <p className="mb-12 text-gray-600">
        Select the membership that fits your fitness goals and lifestyle
      </p>

      <div className="mx-auto grid max-w-6xl gap-6 md:grid-cols-3">
        {plans.map((plan, index) => (
          <div
            key={index}
            className={`group relative flex transform flex-col rounded-xl border p-6 shadow-md transition-transform duration-300 ${
              plan.isPopular
                ? 'z-10 scale-110 border-orange-500 bg-white hover:scale-[1.15]'
                : 'scale-100 border-gray-200 bg-white hover:scale-105'
            } hover:bg-orange-50 hover:shadow-lg`}
          >
            {/* Most Popular Label */}
            {plan.isPopular && (
              <>
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 rounded-t-md bg-orange-500 px-3 py-1 text-xs font-semibold text-white">
                  Most Popular
                </div>
                <div className="absolute top-2 right-2 rounded-full bg-green-500 px-2 py-0.5 text-xs text-white">
                  {plan.badge}
                </div>
              </>
            )}

            {/* Plan Name */}
            <h3 className="mb-2 text-xl font-bold">{plan.name}</h3>

            {/* Price */}
            <p className="mb-4 text-3xl font-extrabold text-orange-500">
              ${plan.price}
              <span className="text-base font-medium text-gray-600">
                /month
              </span>
            </p>

            {/* Features */}
            <ul className="mb-6 space-y-2 text-left">
              {plan.features.map((feature, i) => (
                <li key={i} className="flex items-center text-sm text-gray-700">
                  <CheckCircle className="mr-2 h-4 w-4 text-green-500" />
                  {feature}
                </li>
              ))}
            </ul>

            {/* CTA Button */}
            <button
              className={`mt-auto rounded-md py-2 text-sm font-semibold transition ${
                plan.isPopular
                  ? 'bg-orange-500 text-white hover:bg-orange-600'
                  : 'border border-gray-300 bg-white text-gray-800 hover:bg-gray-100'
              }`}
            >
              {plan.buttonText}
            </button>
          </div>
        ))}
      </div>

      {/* Footer Note */}
      <p className="mt-10 text-sm text-gray-500">
        • Cancel anytime • No setup fees
      </p>
      <div className="mt-2 flex justify-center gap-4 text-xs text-gray-500">
        <span>✅ Mobile app access</span>
        <span>✅ Progress tracking</span>
        <span>✅ Community support</span>
      </div>
    </section>
  )
}

export default PricingPlans
