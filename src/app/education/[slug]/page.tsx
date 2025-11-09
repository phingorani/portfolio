import { Box, Typography, Container, Paper, Link, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import SchoolIcon from '@mui/icons-material/School';
import { educations } from '@/lib/education';
import { notFound } from 'next/navigation';
import ReactMarkdown from 'react-markdown';
import { Course, Semester } from '@/lib/education';

interface EducationPageProps {
  params: {
    slug: string;
  };
}

function CoursesTable({ courses }: { courses: Course[] }) {
  return (
    <TableContainer component={Paper} sx={{ mt: 2 }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Course</TableCell>
            <TableCell>Title</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {courses.map((course) => (
            <TableRow key={course.name}>
              <TableCell>
                <Link href={course.url} target="_blank" rel="noopener noreferrer">
                  {course.name}
                </Link>
              </TableCell>
              <TableCell>{course.title}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default async function EducationPage({ params }: EducationPageProps) {
  const slug = (await params).slug;
  const education = educations.find((e) => e.slug === slug);

  if (!education) {
    notFound();
  }

  return (
    <Container component="main" maxWidth="md">
      <Paper 
        elevation={3} 
        sx={{ 
          mt: 8, 
          p: 4, 
          display: 'flex', 
          flexDirection: 'column',
          alignItems: 'center'
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          {/* Removed DepaulIcon */}
          <Typography component="h1" variant="h2" gutterBottom>
            {education.university}
          </Typography>
        </Box>
        <Typography component="h2" variant="h5" color="text.secondary" gutterBottom>
          {education.degree}
        </Typography>
        <Typography variant="body1" color="text.secondary" gutterBottom>
          {education.location} | {education.date}
        </Typography>
        <Box sx={{ mt: 4, width: '100%' }}>
          {education.description && (
            <Box sx={{ mt: 4 }}>
              <Typography variant="h6" gutterBottom>
                Program Overview
              </Typography>
              <ReactMarkdown>
                {education.description}
              </ReactMarkdown>
            </Box>
          )}
          {education.coreCourses && (
            <Box sx={{ mt: 4 }}>
              <Typography variant="h6" gutterBottom>
                Core Courses
              </Typography>
              <CoursesTable courses={education.coreCourses} />
            </Box>
          )}
          {education.foundationCourses && (
            <Box sx={{ mt: 4 }}>
              <Typography variant="h6" gutterBottom>
                Foundation Courses
              </Typography>
              <CoursesTable courses={education.foundationCourses} />
            </Box>
          )}
          {education.semesters && (
            <Box sx={{ mt: 4 }}>
              {education.semesters.map((semester: Semester) => (
                <Box key={semester.title} sx={{ mt: 4 }}>
                  <Typography variant="h6" gutterBottom>
                    {semester.title}
                  </Typography>
                  <CoursesTable courses={semester.courses} />
                </Box>
              ))}
            </Box>
          )}
          <Box sx={{ mt: 4, display: 'flex', gap: 2 }}>
            <Button
              variant="contained"
              component="a"
              href={education.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Visit the website for ${education.university}`}
            >
              Visit <SchoolIcon sx={{ ml: 1 }} />
            </Button>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
}

export async function generateStaticParams() {
  return educations.map((e) => ({ slug: e.slug }));
}
