import { type Employee } from '../data/types';
import { Service_Category } from '../data/types';
import { normalize } from '../utils/normalize';

interface IProps {
  data: Employee;
  currentSearchTerm?: string;
}

const serviceCats = Object.values(Service_Category);

export const EmployeeItem = ({ data, currentSearchTerm }: IProps) => {
  const term = normalize(currentSearchTerm || '');

  const matchedEmpServices = data.services.filter((s) => {
    const isCategory = serviceCats.some((sc) => normalize(sc).includes(term));

    const isEmployee = normalize(data.name).includes(term);

    if (isEmployee) return true;

    if (isCategory && normalize(s.category).includes(term)) {
      return true;
    }

    return normalize(s.label).includes(term);
  });

  return (
    <div style={styles.container}>
      <div style={styles.nameContainer}>
        <span style={styles.name}>{data.name}</span>

        {data.isPickUpOnly && <span style={styles.puo}>pickup only</span>}
      </div>

      <div>
        {matchedEmpServices.map((s) => (
          <div key={`${data.name}${s.label}`} style={styles.labelContainer}>
            <span style={styles.label}>{s.label}</span>

            {s.note && <span style={styles.puo}>{s.note}</span>}
          </div>
        ))}
      </div>
    </div>
  );
};

const styles: Record<string, React.CSSProperties> = {
  container: {
    background: '#ffffff',
    borderRadius: 10,
    padding: 10,
  },
  nameContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: 12,
  },
  labelContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: 12,
  },
  label: {
    fontSize: 12,
    color: '#192d0c',
    fontWeight: '600',
  },
  name: {
    fontWeight: 'bold',
    fontSize: 18,
    color: '#192d0c',
  },
  puo: {
    fontSize: 12,
    color: '#ff0000',
    fontStyle: 'italic',
    fontWeight: '700',
  },
};
