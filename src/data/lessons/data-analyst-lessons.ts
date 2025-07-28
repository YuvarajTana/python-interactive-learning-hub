import type { Category } from '../../types';

export const dataAnalystCategory: Category = {
  id: 'data-analyst',
  name: 'Data Analyst Skills',
  icon: '📊',
  lessons: [
    {
      id: 'pandas-fundamentals',
      title: 'Pandas Fundamentals',
      subtitle: '🟢 Beginner – Data manipulation and analysis with pandas',
      meta: {
        duration: '20 min read',
        difficulty: 'Beginner'
      },
      content: {
        explanation: 'Master pandas for data manipulation: loading datasets, filtering, grouping, and basic statistical analysis. Pandas is the cornerstone library for data analysis in Python.',
        codeExample: {
          language: 'python',
          filename: 'pandas_basics.py',
          code: `import pandas as pd
import numpy as np

# Load data
df = pd.read_csv('sales_data.csv')

# Basic exploration
print(df.head())
print(df.info())
print(df.describe())

# Data cleaning
df = df.dropna()
df['date'] = pd.to_datetime(df['date'])

# Filtering and selection
high_sales = df[df['revenue'] > 1000]
recent_data = df[df['date'] >= '2024-01-01']

# Grouping and aggregation
monthly_sales = df.groupby('month').agg({
    'revenue': ['sum', 'mean', 'count'],
    'profit': 'sum'
})

# Creating new columns
df['profit_margin'] = df['profit'] / df['revenue'] * 100`
        },
        interactiveCode: {
          defaultCode: `# Pandas Data Analysis Demo
import pandas as pd
import numpy as np

# Create sample e-commerce dataset
data = {
    'order_id': range(1, 101),
    'customer_id': np.random.randint(1, 21, 100),
    'product_category': np.random.choice(['Electronics', 'Clothing', 'Books', 'Home'], 100),
    'order_value': np.random.uniform(10, 500, 100).round(2),
    'quantity': np.random.randint(1, 6, 100),
    'order_date': pd.date_range('2024-01-01', periods=100, freq='D')[:100]
}

df = pd.DataFrame(data)

print("📊 E-commerce Dataset Analysis")
print("\\n=== Basic Dataset Info ===")
print(f"Dataset shape: \\{df.shape}")
print(f"Columns: \\{list(df.columns)}")

print("\\n=== First 5 rows ===")
print(df.head())

print("\\n=== Data Types ===")
print(df.dtypes)

print("\\n=== Statistical Summary ===")
print(df.describe())

print("\\n=== Category Analysis ===")
category_stats = df.groupby('product_category').agg({
    'order_value': ['count', 'sum', 'mean'],
    'quantity': 'sum'
}).round(2)

print("Sales by category:")
print(category_stats)

print("\\n=== High Value Orders (>200) ===")
high_value_orders = df[df['order_value'] > 200]
print(f"Found \\{len(high_value_orders)} high-value orders")
print(high_value_orders[['order_id', 'product_category', 'order_value']].head())

print("\\n=== Monthly Trends ===")
df['month'] = df['order_date'].dt.strftime('%Y-%m')
monthly_revenue = df.groupby('month')['order_value'].sum().round(2)
print("Monthly revenue:")
print(monthly_revenue)`,
          simulatedOutput: `📊 E-commerce Dataset Analysis

=== Basic Dataset Info ===
Dataset shape: (100, 6)
Columns: ['order_id', 'customer_id', 'product_category', 'order_value', 'quantity', 'order_date']

=== First 5 rows ===
   order_id  customer_id product_category  order_value  quantity order_date
0         1           15      Electronics       234.56         3 2024-01-01
1         2            7         Clothing        89.23         1 2024-01-02
2         3           12            Books        45.67         2 2024-01-03
3         4            3             Home       156.78         4 2024-01-04
4         5           18      Electronics       298.45         2 2024-01-05

=== Data Types ===
order_id                int64
customer_id             int64
product_category       object
order_value           float64
quantity                int64
order_date     datetime64[ns]

=== Statistical Summary ===
        order_id  customer_id  order_value    quantity
count     100.00       100.00       100.00      100.00
mean       50.50        10.45       254.73        2.98
std        29.01         5.89       142.67        1.42
min         1.00         1.00        10.45        1.00
25%        25.75         5.25       134.23        2.00
50%        50.50        10.50       248.95        3.00
75%        75.25        15.75       378.45        4.00
max       100.00        20.00       499.87        5.00

=== Category Analysis ===
Sales by category:
                 order_value              quantity
                       count     sum    mean      sum
product_category                                     
Books                     25  6234.56  249.38       72
Clothing                  23  5678.90  246.91       69
Electronics               28  7456.78  266.31       85
Home                      24  6103.45  254.31       74

=== High Value Orders (>200) ===
Found 62 high-value orders
   order_id product_category  order_value
0         1      Electronics       234.56
4         5      Electronics       298.45
6         7             Home       267.89
8         9         Clothing       345.12
9        10            Books       289.67

=== Monthly Trends ===
Monthly revenue:
2024-01    7834.56
2024-02    8967.23
2024-03    8671.90`
        },
        quiz: {
          question: 'Which pandas function is used to group data and perform aggregations?',
          options: [
            { text: 'df.aggregate()', isCorrect: false, explanation: 'aggregate() is used after groupby, not for grouping itself.' },
            { text: 'df.groupby()', isCorrect: true, explanation: 'Correct! groupby() is used to group data by one or more columns, then you can apply aggregation functions.' },
            { text: 'df.pivot()', isCorrect: false, explanation: 'pivot() is used to reshape data, not for grouping and aggregation.' },
            { text: 'df.merge()', isCorrect: false, explanation: 'merge() is used to combine datasets, not for grouping.' }
          ]
        }
      }
    },
    {
      id: 'data-visualization',
      title: 'Data Visualization',
      subtitle: '🟡 Intermediate – Creating insightful charts and plots',
      meta: {
        duration: '25 min read',
        difficulty: 'Intermediate'
      },
      content: {
        explanation: 'Learn to create compelling visualizations using matplotlib, seaborn, and plotly. Transform raw data into clear insights through effective chart design and storytelling.',
        codeExample: {
          language: 'python',
          filename: 'visualization.py',
          code: `import matplotlib.pyplot as plt
import seaborn as sns
import plotly.express as px
import pandas as pd

# Set style
plt.style.use('seaborn-v0_8')
sns.set_palette("husl")

# Load data
df = pd.read_csv('sales_data.csv')

# Basic plots
fig, axes = plt.subplots(2, 2, figsize=(15, 10))

# Line plot - trends over time
df.groupby('month')['revenue'].sum().plot(ax=axes[0,0])
axes[0,0].set_title('Monthly Revenue Trend')

# Bar plot - category comparison
df.groupby('category')['profit'].sum().plot(kind='bar', ax=axes[0,1])
axes[0,1].set_title('Profit by Category')

# Histogram - distribution
df['order_value'].hist(bins=30, ax=axes[1,0])
axes[1,0].set_title('Order Value Distribution')

# Scatter plot - correlation
axes[1,1].scatter(df['marketing_spend'], df['revenue'])
axes[1,1].set_title('Marketing Spend vs Revenue')

plt.tight_layout()
plt.show()`
        },
        interactiveCode: {
          defaultCode: `# Data Visualization Demo
import pandas as pd
import numpy as np

# Create comprehensive sales dataset
np.random.seed(42)
dates = pd.date_range('2024-01-01', periods=90, freq='D')
categories = ['Electronics', 'Clothing', 'Books', 'Home', 'Sports']

data = []
for date in dates:
    for category in categories:
        sales = np.random.normal(1000, 300)  # Base sales with variation
        # Add seasonal patterns
        if category == 'Electronics' and date.month in [11, 12]:
            sales *= 1.5  # Holiday boost
        elif category == 'Sports' and date.month in [6, 7, 8]:
            sales *= 1.3  # Summer boost
        
        data.append({
            'date': date,
            'category': category,
            'sales': max(sales, 100),  # Minimum sales
            'profit_margin': np.random.uniform(0.1, 0.3),
            'units_sold': int(sales / np.random.uniform(50, 200))
        })

df = pd.DataFrame(data)
df['profit'] = df['sales'] * df['profit_margin']
df['month'] = df['date'].dt.strftime('%Y-%m')

print("📈 Data Visualization Analysis")

print("\\n=== Dataset Overview ===")
print(f"Total records: \\{len(df)}")
print(f"Date range: \\{df['date'].min()} to \\{df['date'].max()}")
print(f"Categories: \\{df['category'].unique()}")

print("\\n=== Monthly Sales Trends ===")
monthly_sales = df.groupby('month')['sales'].sum().round(2)
print("Monthly total sales:")
for month, sales in monthly_sales.items():
    print(f"  \\{month}: $\\{sales:,.2f}")

print("\\n=== Category Performance ===")
category_stats = df.groupby('category').agg({
    'sales': ['sum', 'mean'],
    'profit': 'sum',
    'units_sold': 'sum'
}).round(2)

print("Sales by category:")
for category in categories:
    total_sales = category_stats.loc[category, ('sales', 'sum')]
    avg_sales = category_stats.loc[category, ('sales', 'mean')]
    total_profit = category_stats.loc[category, ('profit', 'sum')]
    units = category_stats.loc[category, ('units_sold', 'sum')]
    
    print(f"  \\{category}:")
    print(f"    Total Sales: $\\{total_sales:,.2f}")
    print(f"    Avg Daily Sales: $\\{avg_sales:,.2f}")
    print(f"    Total Profit: $\\{total_profit:,.2f}")
    print(f"    Units Sold: \\{units:,}")

print("\\n=== Top Performing Days ===")
daily_sales = df.groupby('date')['sales'].sum().round(2)
top_5_days = daily_sales.nlargest(5)
print("Best sales days:")
for date, sales in top_5_days.items():
    print(f"  \\{date.strftime('%Y-%m-%d')}: $\\{sales:,.2f}")

print("\\n=== Visualization Insights ===")
print("📊 Chart Recommendations:")
print("  1. Line Chart: Monthly sales trends show seasonal patterns")
print("  2. Bar Chart: Electronics leads in total sales volume")  
print("  3. Pie Chart: Category distribution shows market share")
print("  4. Scatter Plot: Sales vs Profit reveals margin efficiency")
print("  5. Histogram: Daily sales distribution shows business consistency")

# Simulated visualization descriptions
print("\\n=== Key Visual Insights ===")
electronics_sales = df[df['category'] == 'Electronics']['sales'].sum()
total_sales = df['sales'].sum()
electronics_pct = (electronics_sales / total_sales) * 100

sports_summer = df[(df['category'] == 'Sports') & (df['date'].dt.month.isin([6,7,8]))]['sales'].mean()
sports_other = df[(df['category'] == 'Sports') & (~df['date'].dt.month.isin([6,7,8]))]['sales'].mean()
sports_boost = ((sports_summer - sports_other) / sports_other) * 100

print(f"🔍 Electronics accounts for \\{electronics_pct:.1f}% of total sales")
print(f"🏃 Sports category shows \\{sports_boost:.1f}% sales boost in summer months")
print(f"📈 Average daily total sales: $\\{daily_sales.mean():,.2f}")
print(f"📉 Sales coefficient of variation: \\{(daily_sales.std()/daily_sales.mean()*100):.1f}%")`,
          simulatedOutput: `📈 Data Visualization Analysis

=== Dataset Overview ===
Total records: 450
Date range: 2024-01-01 00:00:00 to 2024-03-30 00:00:00
Categories: ['Electronics' 'Clothing' 'Books' 'Home' 'Sports']

=== Monthly Sales Trends ===
Monthly total sales:
  2024-01: $155,234.67
  2024-02: $142,891.23
  2024-03: $158,672.45

=== Category Performance ===
Sales by category:
  Electronics:
    Total Sales: $110,456.78
    Avg Daily Sales: $1,227.30
    Total Profit: $24,578.92
    Units Sold: 1,845
  Clothing:
    Total Sales: $89,234.56
    Avg Daily Sales: $991.50
    Total Profit: $19,867.43
    Units Sold: 1,567
  Books:
    Total Sales: $78,123.45
    Avg Daily Sales: $868.04
    Total Profit: $17,234.56
    Units Sold: 2,134
  Home:
    Total Sales: $92,567.89
    Avg Daily Sales: $1,028.53
    Total Profit: $20,456.78
    Units Sold: 1,789
  Sports:
    Total Sales: $86,415.67
    Avg Daily Sales: $960.17
    Total Profit: $18,661.66
    Units Sold: 1,623

=== Top Performing Days ===
Best sales days:
  2024-03-15: $7,234.56
  2024-02-23: $6,987.34
  2024-01-18: $6,845.23
  2024-03-08: $6,756.89
  2024-02-14: $6,634.45

=== Visualization Insights ===
📊 Chart Recommendations:
  1. Line Chart: Monthly sales trends show seasonal patterns
  2. Bar Chart: Electronics leads in total sales volume
  3. Pie Chart: Category distribution shows market share
  4. Scatter Plot: Sales vs Profit reveals margin efficiency
  5. Histogram: Daily sales distribution shows business consistency

=== Key Visual Insights ===
🔍 Electronics accounts for 24.2% of total sales
🏃 Sports category shows 28.7% sales boost in summer months
📈 Average daily total sales: $5,083.11
📉 Sales coefficient of variation: 23.4%`
        },
        quiz: {
          question: 'Which type of chart is best for showing the relationship between two continuous variables?',
          options: [
            { text: 'Bar chart', isCorrect: false, explanation: 'Bar charts are used for categorical data comparison, not continuous variable relationships.' },
            { text: 'Pie chart', isCorrect: false, explanation: 'Pie charts show proportions of a whole, not relationships between variables.' },
            { text: 'Scatter plot', isCorrect: true, explanation: 'Correct! Scatter plots are ideal for showing relationships and correlations between two continuous variables.' },
            { text: 'Histogram', isCorrect: false, explanation: 'Histograms show the distribution of a single variable, not relationships between two variables.' }
          ]
        }
      }
    },
    {
      id: 'statistical-analysis',
      title: 'Statistical Analysis',
      subtitle: '🔵 Advanced – Hypothesis testing, correlation, and statistical inference',
      meta: {
        duration: '30 min read',
        difficulty: 'Advanced'
      },
      content: {
        explanation: 'Apply statistical methods to extract meaningful insights from data. Learn hypothesis testing, correlation analysis, regression, and statistical significance testing.',
        codeExample: {
          language: 'python',
          filename: 'statistics.py',
          code: `import pandas as pd
import numpy as np
from scipy import stats
import statsmodels.api as sm

# Load data
df = pd.read_csv('customer_data.csv')

# Descriptive statistics
print(df.describe())

# Correlation analysis
correlation_matrix = df.corr()
print(correlation_matrix)

# Hypothesis testing - t-test
group_a = df[df['group'] == 'A']['conversion_rate']
group_b = df[df['group'] == 'B']['conversion_rate']

t_stat, p_value = stats.ttest_ind(group_a, group_b)
print(f"T-statistic: \\{t_stat}, P-value: \\{p_value}")

# Linear regression
X = df[['age', 'income', 'previous_purchases']]
y = df['lifetime_value']

X = sm.add_constant(X)  # Add intercept
model = sm.OLS(y, X).fit()
print(model.summary())`
        },
        interactiveCode: {
          defaultCode: `# Statistical Analysis Demo
import pandas as pd
import numpy as np
from scipy import stats

# Create customer behavior dataset
np.random.seed(42)
n_customers = 1000

# Generate customer data with realistic relationships
ages = np.random.normal(40, 12, n_customers)
ages = np.clip(ages, 18, 80)

incomes = 30000 + (ages - 25) * 1500 + np.random.normal(0, 15000, n_customers)
incomes = np.clip(incomes, 20000, 200000)

# Purchase behavior influenced by age and income
base_purchases = 2 + (ages - 18) * 0.1 + (incomes - 30000) * 0.00002
purchase_frequency = np.random.poisson(np.clip(base_purchases, 0.5, 20), n_customers)

# Customer satisfaction (influenced by service quality)
satisfaction_scores = np.random.normal(7.5, 1.5, n_customers)
satisfaction_scores = np.clip(satisfaction_scores, 1, 10)

# Churn probability (inverse relationship with satisfaction)
churn_probability = 1 / (1 + np.exp(satisfaction_scores - 5))
churned = np.random.binomial(1, churn_probability, n_customers)

# A/B test groups
test_groups = np.random.choice(['Control', 'Treatment'], n_customers)
treatment_boost = np.where(test_groups == 'Treatment', 1.2, 1.0)
purchase_frequency = purchase_frequency * treatment_boost

df = pd.DataFrame({
    'customer_id': range(1, n_customers + 1),
    'age': ages.round(1),
    'income': incomes.round(2),
    'purchase_frequency': purchase_frequency,
    'satisfaction_score': satisfaction_scores.round(1),
    'churned': churned,
    'test_group': test_groups
})

print("📊 Statistical Analysis Demo")
print("\\n=== Dataset Overview ===")
print(f"Total customers: \\{len(df)}")
print(f"Features: \\{list(df.columns)}")

print("\\n=== Descriptive Statistics ===")
desc_stats = df.describe().round(2)
print(desc_stats)

print("\\n=== Correlation Analysis ===")
numeric_cols = ['age', 'income', 'purchase_frequency', 'satisfaction_score']
correlation_matrix = df[numeric_cols].corr().round(3)
print("Correlation matrix:")
print(correlation_matrix)

print("\\n=== Key Correlations ===")
print(f"Age vs Income: \\{correlation_matrix.loc['age', 'income']:.3f}")
print(f"Income vs Purchase Frequency: \\{correlation_matrix.loc['income', 'purchase_frequency']:.3f}")
print(f"Satisfaction vs Purchase Frequency: \\{correlation_matrix.loc['satisfaction_score', 'purchase_frequency']:.3f}")

print("\\n=== A/B Test Analysis ===")
control_group = df[df['test_group'] == 'Control']['purchase_frequency']
treatment_group = df[df['test_group'] == 'Treatment']['purchase_frequency']

print(f"Control group mean: \\{control_group.mean():.2f}")
print(f"Treatment group mean: \\{treatment_group.mean():.2f}")
print(f"Difference: \\{treatment_group.mean() - control_group.mean():.2f}")

# Perform t-test
t_stat, p_value = stats.ttest_ind(treatment_group, control_group)
print(f"\\nT-test results:")
print(f"T-statistic: \\{t_stat:.3f}")
print(f"P-value: \\{p_value:.6f}")

alpha = 0.05
if p_value < alpha:
    print(f"✅ Statistically significant (p < \\{alpha})")
    print("Treatment group performs significantly better")
else:
    print(f"❌ Not statistically significant (p >= \\{alpha})")

print("\\n=== Churn Analysis ===")
churn_rate = df['churned'].mean()
print(f"Overall churn rate: \\{churn_rate:.1%}")

# Churn by satisfaction score
high_satisfaction = df[df['satisfaction_score'] >= 8]['churned'].mean()
low_satisfaction = df[df['satisfaction_score'] <= 5]['churned'].mean()

print(f"Churn rate (high satisfaction ≥8): \\{high_satisfaction:.1%}")
print(f"Churn rate (low satisfaction ≤5): \\{low_satisfaction:.1%}")

# Chi-square test for churn vs test group
churn_crosstab = pd.crosstab(df['test_group'], df['churned'])
chi2, p_chi2, dof, expected = stats.chi2_contingency(churn_crosstab)

print(f"\\nChurn vs Test Group Analysis:")
print(f"Chi-square statistic: \\{chi2:.3f}")
print(f"P-value: \\{p_chi2:.6f}")

print("\\n=== Business Insights ===")
avg_purchase_increase = ((treatment_group.mean() / control_group.mean()) - 1) * 100
print(f"📈 Treatment increases purchase frequency by \\{avg_purchase_increase:.1f}%")

high_value_customers = df[df['income'] > df['income'].quantile(0.8)]
print(f"💰 Top 20% income customers have \\{high_value_customers['purchase_frequency'].mean():.1f} avg purchases")

satisfied_customers = df[df['satisfaction_score'] >= 8]
print(f"😊 Highly satisfied customers churn \\{satisfied_customers['churned'].mean():.1%} of the time")`,
          simulatedOutput: `📊 Statistical Analysis Demo

=== Dataset Overview ===
Total customers: 1000
Features: ['customer_id', 'age', 'income', 'purchase_frequency', 'satisfaction_score', 'churned', 'test_group']

=== Descriptive Statistics ===
        customer_id       age      income  purchase_frequency  satisfaction_score  churned
count      1000.00   1000.00    1000.00             1000.00             1000.00  1000.00
mean        500.50     39.97   59847.63                6.84                7.48     0.23
std         288.82     11.98   29234.78                4.12                1.51     0.42
min           1.00     18.00   20000.00                0.00                1.00     0.00
25%         250.75     31.25   38567.89                3.50                6.40     0.00
50%         500.50     39.80   58234.45                6.20                7.50     0.00
75%         750.25     48.72   78934.56                9.80                8.60     0.00
max        1000.00     80.00  200000.00               24.00               10.00     1.00

=== Correlation Analysis ===
Correlation matrix:
                        age  income  purchase_frequency  satisfaction_score
age                   1.000   0.789               0.567               0.023
income                0.789   1.000               0.634              -0.012
purchase_frequency    0.567   0.634               1.000               0.089
satisfaction_score    0.023  -0.012               0.089               1.000

=== Key Correlations ===
Age vs Income: 0.789
Income vs Purchase Frequency: 0.634
Satisfaction vs Purchase Frequency: 0.089

=== A/B Test Analysis ===
Control group mean: 6.24
Treatment group mean: 7.46
Difference: 1.22

T-test results:
T-statistic: 7.845
P-value: 0.000000

✅ Statistically significant (p < 0.05)
Treatment group performs significantly better

=== Churn Analysis ===
Overall churn rate: 23.4%

Churn rate (high satisfaction ≥8): 8.9%
Churn rate (low satisfaction ≤5): 67.3%

Churn vs Test Group Analysis:
Chi-square statistic: 2.145
P-value: 0.143218

=== Business Insights ===
📈 Treatment increases purchase frequency by 19.6%
💰 Top 20% income customers have 11.2 avg purchases
😊 Highly satisfied customers churn 8.9% of the time`
        },
        quiz: {
          question: 'What does a p-value less than 0.05 typically indicate in hypothesis testing?',
          options: [
            { text: 'The null hypothesis is definitely true', isCorrect: false, explanation: 'A low p-value suggests rejecting the null hypothesis, not confirming it.' },
            { text: 'The result is statistically significant and we reject the null hypothesis', isCorrect: true, explanation: 'Correct! A p-value < 0.05 typically indicates statistical significance, leading us to reject the null hypothesis.' },
            { text: 'There is a 95% chance the alternative hypothesis is correct', isCorrect: false, explanation: 'P-values don\'t directly give us the probability that a hypothesis is correct.' },
            { text: 'The sample size is too small', isCorrect: false, explanation: 'P-values are not directly related to sample size adequacy.' }
          ]
        }
      }
    },
    {
      id: 'sql-data-analysis',
      title: 'SQL for Data Analysis',
      subtitle: '🟡 Intermediate – Database querying and data extraction',
      meta: {
        duration: '22 min read',
        difficulty: 'Intermediate'
      },
      content: {
        explanation: 'Master SQL for data analysis: complex joins, window functions, CTEs, and analytical queries. Learn to extract and transform data directly from databases for analysis.',
        codeExample: {
          language: 'sql',
          filename: 'analytics_queries.sql',
          code: `-- Sales analysis with window functions
WITH monthly_sales AS (
    SELECT 
        DATE_TRUNC('month', order_date) as month,
        SUM(total_amount) as revenue,
        COUNT(*) as order_count,
        AVG(total_amount) as avg_order_value
    FROM orders 
    WHERE order_date >= '2024-01-01'
    GROUP BY DATE_TRUNC('month', order_date)
),
sales_with_growth AS (
    SELECT 
        month,
        revenue,
        LAG(revenue) OVER (ORDER BY month) as prev_month_revenue,
        ROUND(
            ((revenue - LAG(revenue) OVER (ORDER BY month)) / 
             LAG(revenue) OVER (ORDER BY month) * 100), 2
        ) as growth_rate
    FROM monthly_sales
)
SELECT * FROM sales_with_growth
ORDER BY month;`
        },
        interactiveCode: {
          defaultCode: `# SQL Data Analysis Demo (Simulated)
import pandas as pd
import numpy as np
from datetime import datetime, timedelta

# Create simulated database tables
np.random.seed(42)

# Customers table
customers = pd.DataFrame({
    'customer_id': range(1, 501),
    'customer_name': [f'Customer_{i}' for i in range(1, 501)],
    'city': np.random.choice(['New York', 'Los Angeles', 'Chicago', 'Houston', 'Phoenix'], 500),
    'registration_date': pd.date_range('2023-01-01', periods=500, freq='D')[:500],
    'customer_segment': np.random.choice(['Premium', 'Standard', 'Basic'], 500, p=[0.2, 0.5, 0.3])
})

# Products table
products = pd.DataFrame({
    'product_id': range(1, 101),
    'product_name': [f'Product_{i}' for i in range(1, 101)],
    'category': np.random.choice(['Electronics', 'Clothing', 'Books', 'Home', 'Sports'], 100),
    'price': np.random.uniform(10, 500, 100).round(2)
})

# Orders table (simulating SQL with pandas)
order_dates = pd.date_range('2024-01-01', '2024-12-31', freq='D')
orders_data = []

for i in range(2000):
    order_id = i + 1
    customer_id = np.random.randint(1, 501)
    order_date = np.random.choice(order_dates)
    
    # Random number of items per order (1-5)
    num_items = np.random.randint(1, 6)
    order_total = 0
    
    for _ in range(num_items):
        product_id = np.random.randint(1, 101)
        quantity = np.random.randint(1, 4)
        price = products[products['product_id'] == product_id]['price'].iloc[0]
        order_total += price * quantity
    
    orders_data.append({
        'order_id': order_id,
        'customer_id': customer_id,
        'order_date': order_date,
        'total_amount': round(order_total, 2)
    })

orders = pd.DataFrame(orders_data)

print("🗄️ SQL Data Analysis Demo")
print("\\n=== Database Tables Overview ===")
print(f"Customers: \\{len(customers)} records")
print(f"Products: \\{len(products)} records")  
print(f"Orders: \\{len(orders)} records")

print("\\n=== SQL Query 1: Monthly Sales Analysis ===")
print("-- Equivalent SQL:")
print("SELECT DATE_TRUNC('month', order_date) as month,")
print("       SUM(total_amount) as revenue,")
print("       COUNT(*) as order_count,")
print("       ROUND(AVG(total_amount), 2) as avg_order_value")
print("FROM orders")
print("GROUP BY DATE_TRUNC('month', order_date)")
print("ORDER BY month;")

# Pandas equivalent
monthly_sales = orders.groupby(orders['order_date'].dt.to_period('M')).agg({
    'total_amount': ['sum', 'count', 'mean']
}).round(2)

monthly_sales.columns = ['revenue', 'order_count', 'avg_order_value']
print("\\nResults:")
print(monthly_sales.head())

print("\\n=== SQL Query 2: Customer Segmentation Analysis ===")
print("-- Equivalent SQL:")
print("SELECT c.customer_segment,")
print("       COUNT(DISTINCT c.customer_id) as customer_count,")
print("       COUNT(o.order_id) as total_orders,")
print("       SUM(o.total_amount) as total_revenue,")
print("       ROUND(AVG(o.total_amount), 2) as avg_order_value")
print("FROM customers c")
print("LEFT JOIN orders o ON c.customer_id = o.customer_id")
print("GROUP BY c.customer_segment;")

# Pandas equivalent with merge
customer_orders = customers.merge(orders, on='customer_id', how='left')
segment_analysis = customer_orders.groupby('customer_segment').agg({
    'customer_id': 'nunique',
    'order_id': 'count',
    'total_amount': ['sum', 'mean']
}).round(2)

segment_analysis.columns = ['customer_count', 'total_orders', 'total_revenue', 'avg_order_value']
print("\\nResults:")
print(segment_analysis)

print("\\n=== SQL Query 3: Top Customers by Revenue ===")
print("-- Equivalent SQL:")
print("SELECT c.customer_name,")
print("       c.city,")
print("       COUNT(o.order_id) as order_count,")
print("       SUM(o.total_amount) as total_spent")
print("FROM customers c")
print("JOIN orders o ON c.customer_id = o.customer_id")
print("GROUP BY c.customer_id, c.customer_name, c.city")
print("HAVING COUNT(o.order_id) >= 3")
print("ORDER BY total_spent DESC")
print("LIMIT 10;")

# Pandas equivalent
top_customers = customer_orders.groupby(['customer_id', 'customer_name', 'city']).agg({
    'order_id': 'count',
    'total_amount': 'sum'
}).round(2)

top_customers.columns = ['order_count', 'total_spent']
top_customers = top_customers[top_customers['order_count'] >= 3].sort_values('total_spent', ascending=False)

print("\\nResults (Top 10):")
print(top_customers.head(10))

print("\\n=== SQL Query 4: Product Category Performance ===")
print("-- Equivalent SQL with window function:")
print("SELECT category,")
print("       SUM(revenue) as total_revenue,")
print("       ROUND(SUM(revenue) * 100.0 / SUM(SUM(revenue)) OVER(), 2) as revenue_percentage")
print("FROM (")
print("    SELECT p.category, p.price * oi.quantity as revenue")
print("    FROM order_items oi")
print("    JOIN products p ON oi.product_id = p.product_id")
print(") sub")
print("GROUP BY category")
print("ORDER BY total_revenue DESC;")

# Simplified category analysis (assuming equal distribution)
category_performance = products.groupby('category').agg({
    'price': ['mean', 'count']
}).round(2)

category_performance.columns = ['avg_price', 'product_count']
category_performance['estimated_revenue'] = category_performance['avg_price'] * category_performance['product_count'] * 20  # Estimate
total_estimated = category_performance['estimated_revenue'].sum()
category_performance['revenue_percentage'] = (category_performance['estimated_revenue'] / total_estimated * 100).round(2)

print("\\nResults:")
print(category_performance.sort_values('estimated_revenue', ascending=False))

print("\\n=== Key SQL Insights ===")
total_revenue = orders['total_amount'].sum()
avg_monthly_revenue = monthly_sales['revenue'].mean()
most_valuable_segment = segment_analysis['total_revenue'].idxmax()

print(f"💰 Total revenue: $\\{total_revenue:,.2f}")
print(f"📈 Average monthly revenue: $\\{avg_monthly_revenue:,.2f}")
print(f"🎯 Most valuable customer segment: \\{most_valuable_segment}")
print(f"🏆 Top customer spent: $\\{top_customers['total_spent'].iloc[0]:,.2f}")`,
          simulatedOutput: `🗄️ SQL Data Analysis Demo

=== Database Tables Overview ===
Customers: 500 records
Products: 100 records
Orders: 2000 records

=== SQL Query 1: Monthly Sales Analysis ===
-- Equivalent SQL:
SELECT DATE_TRUNC('month', order_date) as month,
       SUM(total_amount) as revenue,
       COUNT(*) as order_count,
       ROUND(AVG(total_amount), 2) as avg_order_value
FROM orders
GROUP BY DATE_TRUNC('month', order_date)
ORDER BY month;

Results:
            revenue  order_count  avg_order_value
2024-01   89234.56          167           534.33
2024-02   76891.23          145           530.28
2024-03   92567.89          171           541.33
2024-04   85432.11          158           540.71
2024-05   91234.67          169           539.85

=== SQL Query 2: Customer Segmentation Analysis ===
-- Equivalent SQL:
SELECT c.customer_segment,
       COUNT(DISTINCT c.customer_id) as customer_count,
       COUNT(o.order_id) as total_orders,
       SUM(o.total_amount) as total_revenue,
       ROUND(AVG(o.total_amount), 2) as avg_order_value
FROM customers c
LEFT JOIN orders o ON c.customer_id = o.customer_id
GROUP BY c.customer_segment;

Results:
                 customer_count  total_orders  total_revenue  avg_order_value
Basic                       149           589     318234.56           540.29
Premium                     101           412     223891.23           543.42
Standard                    250          1012     546789.12           540.34

=== SQL Query 3: Top Customers by Revenue ===
-- Equivalent SQL:
SELECT c.customer_name,
       c.city,
       COUNT(o.order_id) as order_count,
       SUM(o.total_amount) as total_spent
FROM customers c
JOIN orders o ON c.customer_id = o.customer_id
GROUP BY c.customer_id, c.customer_name, c.city
HAVING COUNT(o.order_id) >= 3
ORDER BY total_spent DESC
LIMIT 10;

Results (Top 10):
                                    order_count  total_spent
customer_id customer_name city                               
234         Customer_234  Chicago            8      4523.67
89          Customer_89   New York           7      4234.56
345         Customer_345  Houston            6      3987.23
156         Customer_156  Phoenix            9      3876.45
423         Customer_423  Los Angeles        5      3654.32
278         Customer_278  Chicago            7      3543.21
198         Customer_198  New York           6      3456.78
367         Customer_367  Houston            8      3398.54
134         Customer_134  Phoenix            5      3287.65
456         Customer_456  Los Angeles        7      3176.43

=== SQL Query 4: Product Category Performance ===
-- Equivalent SQL with window function:
SELECT category,
       SUM(revenue) as total_revenue,
       ROUND(SUM(revenue) * 100.0 / SUM(SUM(revenue)) OVER(), 2) as revenue_percentage
FROM (
    SELECT p.category, p.price * oi.quantity as revenue
    FROM order_items oi
    JOIN products p ON oi.product_id = p.product_id
) sub
GROUP BY category
ORDER BY total_revenue DESC;

Results:
            avg_price  product_count  estimated_revenue  revenue_percentage
Electronics    267.45             20            106980               23.45
Home           234.67             18             84481               18.52
Sports         198.34             22             87340               19.16
Clothing       156.78             21             65849               14.44
Books          123.45             19             46911               10.29

=== Key SQL Insights ===
💰 Total revenue: $1,088,914.91
📈 Average monthly revenue: $87,113.19
🎯 Most valuable customer segment: Standard
🏆 Top customer spent: $4,523.67`
        },
        quiz: {
          question: 'What is the purpose of a Window Function in SQL?',
          options: [
            { text: 'To filter rows based on conditions', isCorrect: false, explanation: 'Row filtering is done with WHERE clauses, not window functions.' },
            { text: 'To perform calculations across a set of rows related to the current row', isCorrect: true, explanation: 'Correct! Window functions allow calculations across rows without grouping, like running totals or rankings.' },
            { text: 'To join tables together', isCorrect: false, explanation: 'Table joins are performed with JOIN clauses, not window functions.' },
            { text: 'To create temporary tables', isCorrect: false, explanation: 'Temporary tables are created with CREATE TEMPORARY TABLE or CTEs.' }
          ]
        }
      }
    }
  ]
}; 